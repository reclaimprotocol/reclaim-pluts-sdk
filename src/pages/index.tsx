import { Button, useToast } from "@chakra-ui/react";
import { useNetwork, useWallet } from "@meshsdk/react";

import style from "@/styles/Home.module.css";
import ConnectionHandler from "@/components/ConnectionHandler";
import { lockTx } from "@/offchain/lockTx";
import { unlockTx } from "@/offchain/unlockTx";
import { Proof } from "@reclaimprotocol/js-sdk";

export default function Home() {
    const { wallet, connected } = useWallet();
    const network = useNetwork();
    const toast = useToast();

    if (typeof network === "number" && network !== 0) {
        return (
            <div className={[
                style.pageContainer,
                "center-child-flex-even"
            ].join(" ")}
            >
                <b style={{
                    margin: "auto 10vw"
                }}>
                    Make sure to set your wallet in testnet mode;<br />
                    We are playing with founds here!
                </b>
                <Button
                    onClick={() => window.location.reload()}
                    style={{
                        margin: "auto 10vw"
                    }}
                >Refersh page</Button>
            </div>
        )
    }
    const mockProof: Proof = {
        "identifier": "0xfe236ab1e3ffa62937fb5da38b3cfc857e95f3921a0c7ed4201b32a1d59c0e21",
        "claimData": {
            "provider": "http",
            "parameters": "{\"body\":\"\",\"geoLocation\":\"in\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"_steamid\\\">Steam ID: (?<CLAIM_DATA>.*)</div>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"_steamid\\\">Steam ID: (?<CLAIM_DATA>.*)</div>\",\"xPath\":\"id(\\\"responsive_page_template_content\\\")/div[@class=\\\"page_header_ctn\\\"]/div[@class=\\\"page_content\\\"]/div[@class=\\\"youraccount_steamid\\\"]\"}],\"url\":\"https://store.steampowered.com/account/\"}",
            "owner": "0x978cfc07d22367f31a8951d50245a70b8a1db38b",
            "timestampS": 1712084067,
            "context": "{\"contextAddress\":\"0x0\",\"contextMessage\":\"\",\"extractedParameters\":{\"CLAIM_DATA\":\"76561199614512180\"},\"providerHash\":\"0xffd5f761e0fb207368d9ebf9689f077352ab5d20ae0a2c23584c2cd90fc1b1bf\"}",
            "identifier": "0xfe236ab1e3ffa62937fb5da38b3cfc857e95f3921a0c7ed4201b32a1d59c0e21",
            "epoch": 1
        },
        "signatures": [
            "0x9c1ade825580935053f998b87f4c0e75ae215bc8084556864f20ece065a1810121548c056900ec1b6fbb6ed8688465db5e7138a8541ad0d128b7055c716c18911c"
        ],
        witnesses: [],
        extractedParameterValues: undefined
    }


    function onLock() {
        lockTx(wallet, mockProof)
            // lock transaction created successfully
            .then(txHash => toast({
                title: `lock tx submitted: https://preprod.cardanoscan.io/transaction/${txHash}`,
                status: "success"
            }))
            // lock transaction failed
            .catch(e => {
                toast({
                    title: `something went wrong`,
                    status: "error"
                });
                console.error(e)
            });
    }

    function onUnlock() {
        unlockTx(wallet, mockProof)
            // unlock transaction created successfully
            .then(txHash => toast({
                title: `unlock tx submitted: https://preprod.cardanoscan.io/transaction/${txHash}`,
                status: "success"
            }))
            // unlock transaction failed
            .catch(e => {
                toast({
                    title: `something went wrong`,
                    status: "error"
                });
                console.error(e)
            });
    }

    return (
        <div className={[
            style.pageContainer,
            "center-child-flex-even"
        ].join(" ")} >
            <ConnectionHandler />
            {
                connected &&
                <>
                    <Button onClick={onLock} >Lock 10 tADA</Button>
                    <Button onClick={onUnlock} >Unlock</Button>
                </>
            }
        </div>
    )
}