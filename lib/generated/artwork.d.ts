// Types for the generated artwork manifest (scripts/promote-artwork.mjs).
declare const manifest: Record<
  string,
  {
    kind: 'mono' | 'layers' | 'tone';
    render?: 'vector' | 'masks';
    width: number;
    height: number;
    hash: string;
    file?: string;
    layers?: { name: string; key: string; d?: string; file?: string }[];
    base: string;
  }
>;
export default manifest;
