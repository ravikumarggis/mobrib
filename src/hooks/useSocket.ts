
// import { useEffect, useState } from "react";
// import { socket } from "../services/socket";

// const useSocket = () => {
//     const [cmc_updated, setCMC_updated] = useState<string[]>([]);
//     useEffect(() => {

//         const handleData = (data: string) => {
//             console.log(data, "handleData>>>>>>>>>>>>>>>>>>>>>")
//             setCMC_updated((prev) => [...prev, data]);
//         };

//         socket.on("cmc_updated", handleData);
//         return () => {
//             socket.off("cmc_updated", handleData);
//         };
//     }, []);

//     return { cmc_updated };
// };

// export default useSocket;

import React from 'react'

const useSocket = () => {
    return;
}

export default useSocket
