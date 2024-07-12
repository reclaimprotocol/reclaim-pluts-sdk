import { BrowserWallet } from "@meshsdk/core";
import getTxBuilder from "./getTxBuilder";
import { Address, isData, Data, DataB, Tx, DataMap, DataConstr, DataPair, data } from "@harmoniclabs/plu-ts";
import { script, scriptTestnetAddr } from "../../contracts/reclaimPluts";
import { koios } from "./koios";
import { fromAscii, uint8ArrayEq } from "@harmoniclabs/uint8array-utils";
import { toPlutsUtxo } from "./mesh-utils";
import { Proof, Reclaim } from "@reclaimprotocol/js-sdk";
import {  sha3 } from "@harmoniclabs/crypto";
import { toHexString } from "./utils";


function buildRedemeer(signatures: string, parameters: string){
    return new DataMap<DataB, DataB>( [ 
        new DataPair(
                new DataB(fromAscii("parameters")),
                new DataB(fromAscii(parameters)), 
        ),
        new DataPair(
                new DataB(fromAscii("signatures")), 
                new DataB(fromAscii(signatures))
    )]);
    
}

async function getUnlockTx( wallet: BrowserWallet, reclaimProof: Proof ): Promise<Tx>
{

    // verify proof here with @reclaimprotocol/js-sdk
    // Reclaim.verifySignedProof(reclaimProof); <-----------------------------------------------------------------


    const myAddrs = (await wallet.getUsedAddresses()).map( Address.fromString );
    
    const txBuilder = await getTxBuilder();
    const myUTxOs = (await wallet.getUtxos()).map( toPlutsUtxo );

    const myAddr = myAddrs[0]

    const datumBytes = new TextEncoder().encode(reclaimProof.claimData.parameters + reclaimProof.signatures[0]);

    // only the onses with valid datum
    const utxoToSpend = (await koios.address.utxos( scriptTestnetAddr ))
    .find( utxo => {
        const datum = utxo.resolved.datum;

        if(
            // datum is inline
            isData( datum ) &&
            // and is only bytes
            datum instanceof DataB
        )
        {
            
            // not a pkh of mine; not an utxo I can unlock
            if( uint8ArrayEq(datumBytes, datum.bytes.toBuffer())  ) return false;

            return true;
        }

        return false;
    });

    if( utxoToSpend === undefined )
    {
        throw "uopsie, are you sure your tx had enough time to get to the blockchain?"
    }

    return txBuilder.buildSync({
        inputs: [
            {
                utxo: utxoToSpend as any,
                // we must include the utxo that holds our script
                inputScript: {
                    script,
                    datum: "inline", // the datum is present already on `utxoToSpend`
                    redeemer: new DataB(new TextEncoder().encode(toHexString(sha3(datumBytes))))
                }
            }
        ],
        requiredSigners: [ myAddr.paymentCreds.hash ],
        // make sure to include collateral when using contracts
        collaterals: [ myUTxOs[0] ],
        // send everything back to us
        changeAddress: myAddr
    });
}

export async function unlockTx( wallet: BrowserWallet, proof: Proof ): Promise<string>
{
    const unsingedTx = await getUnlockTx( wallet , proof);

    const txStr = await wallet.signTx(
        unsingedTx.toCbor().toString(),
        true // partial sign because we have smart contracts in the transaction
    );

    return (await koios.tx.submit( Tx.fromCbor( txStr ) )).toString();
}