import { Address, bs, PScriptContext, PaymentCredentials, Script, bool, compile, makeValidator, pfn, pstruct, str, palias, psha3_256} from "@harmoniclabs/plu-ts";


export const Datum = palias(bs)
export const Redeemer = palias(bs)

const reclaimPluts = pfn([
    Datum.type,
    Redeemer.type,
    PScriptContext.type
],  bool)
(( datum, redeemer, ctx ) => {
    return redeemer.eq( datum );
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