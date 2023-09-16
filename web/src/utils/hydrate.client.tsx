"use client";

import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

function Hydrate(props:any) {
    return <RQHydrate {...props} />;
}

export default Hydrate;
