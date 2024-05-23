import { Address, bs, PScriptContext, PaymentCredentials, Script, bool, compile, makeValidator, pfn, pstruct, str, palias, psha3_256} from "@harmoniclabs/plu-ts";


export const Redeemer = pstruct({
    SignedClaim: {
        signatures: str,
        parameters: str,
    }
})

export const Datum = palias(bs)

const reclaimPluts = pfn([
    Datum.type,
    Redeemer.type,
    PScriptContext.type
],  bool)
(( datum, redeemer, ctx ) => {
    const amplifiedData = redeemer.signatures.concat(redeemer.parameters).utf8Encoded.toString();
    return psha3_256.$(amplifiedData).eq( datum );
});


///////////////////////////////////////////////////////////////////
// ------------------------------------------------------------- //
// ------------------------- utilities ------------------------- //
// ------------------------------------------------------------- //
///////////////////////////////////////////////////////////////////

export const untypedValidator = makeValidator( reclaimPluts );

export const compiledContract = compile( untypedValidator );

export const script = new Script(
    "PlutusScriptV2",
    compiledContract
);

export const scriptTestnetAddr = new Address(
    "testnet",
    PaymentCredentials.script( script.hash )
);