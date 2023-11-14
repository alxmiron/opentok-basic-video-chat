import { MediaProcessorConnector, MediaProcessor } from './lib/mediaProcessor.js';

import { NoiseSuppressionTransformer } from './lib/noiseSuppresion.js';

let processor;
let transformer;

export async function suppressNoiseFromAudioStream(source) {
  try {
    processor = new MediaProcessor();
    transformer = new NoiseSuppressionTransformer();
    await transformer.init({
      //uncomment the line below pointing to where the assets are stored and set disableWasmMultiThread to false
      //to use multithreadding and improve performance
      // assetsDirBaseUrl: `${window.location.origin}/dist`,
      disableWasmMultiThread: true,
    });
    await processor.setTransformers([
      transformer,
      // my other audio transformers
    ]);
    const connector = new MediaProcessorConnector(processor);
    const track = await connector.setTrack(source.getAudioTracks()[0]);
    const output = new MediaStream();
    output.addTrack(track);
    return output;
  } catch (e) {
    console.log('something went wrong');

    throw e;
  }
}

export function toggleNoiseReductor(enabledNow) {
  if (!transformer) return;
  if (enabledNow) {
    console.log('disabling noise reduction');
    transformer.disable();
  } else {
    console.log('enabling noise reduction');
    transformer.enable();
  }
}
