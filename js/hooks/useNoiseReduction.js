import { useEffect, useState } from "preact/hooks";
import { toggleNoiseReductor } from "../noiseReduction";

export const useNoiseReduction = () => {
    const [noiseReductionOn, setNoiseReduction] = useState(true);

    useEffect(() => {
        toggleNoiseReductor(noiseReductionOn)
    }, [noiseReductionOn])

    return { noiseReductionOn, setNoiseReduction }
}