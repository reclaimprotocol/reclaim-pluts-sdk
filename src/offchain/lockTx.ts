import { BrowserWallet } from "@meshsdk/core";
import getTxBuilder from "./getTxBuilder";
import { scriptTestnetAddr } from "../../contracts/reclaimPluts";
import { Value, DataB, Address, Tx } from "@harmoniclabs/plu-ts";
import { toPlutsUtxo } from "./mesh-utils";
import koios from "./koios";
import {Proof, Reclaim} from "@reclaimprotocol/js-sdk"
import {  sha3 , byte} from "@harmoniclabs/plu-ts/dist/crypto";

function toHexString(byteArray: byte[]) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

async function getLockTx( wallet: BrowserWallet, reclaimProof: Proof ): Promise<Tx>
{
    // creates an address form the bech32 form
    const myAddr = Address.fromString(
        await wallet.getChangeAddress()
    );
    console.log(myAddr);

    const txBuilder = await getTxBuilder();
    const myUTxOs = (await wallet.getUtxos()).map( toPlutsUtxo );

    if( myUTxOs.length === 0 )
    {
        throw new Error("have you requested founds from the faucet?")
    }

    

    const parameters = reclaimProof.claimData.parameters
    const signatures = reclaimProof.signatures[0]

    const utxo = myUTxOs.find( u => u.resolved.value.lovelaces > 15_000_000 );

    if( utxo === undefined )
    {
        throw "not enough ada";
    }

    const datumBytes = new TextEncoder().encode(parameters+signatures);
    return txBuilder.buildSync({
        inputs: [{ utxo }],
        outputs: [
            { // output holding the founds that we'll spend later
                address: scriptTestnetAddr,
                // 10M lovelaces === 10 ADA
                value: Value.lovelaces( 10_000_000 ),
                // remeber to include a datum
                datum: new DataB(
                    // remember we set the datum to be the public key hash?
                    // we can extract it from the address as follows
                    new TextEncoder().encode(toHexString(sha3(datumBytes)))
                )
            }
        ],
        // send everything left back to us
        changeAddress: myAddr
    });
}

export async function lockTx( wallet: BrowserWallet, reclaimProof: Proof): Promise<string>
{
    const unsingedTx = await getLockTx( wallet, reclaimProof );

    const txStr = await wallet.signTx(
        unsingedTx.toCbor().toString()
    );

    return (await koios.tx.submit( Tx.fromCbor( txStr ) as any )).toString();
}
