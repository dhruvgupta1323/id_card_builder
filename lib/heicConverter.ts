export async function convertHeicToJpeg(file: File): Promise<Blob | File> {
  const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                 file.name.toLowerCase().endsWith('.heif') ||
                 file.type === 'image/heic' || 
                 file.type === 'image/heif';

  if (!isHeic) {
    return file;
  }

  try {
    const heic2any = (await import('heic2any')).default;
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });
    
    const blobResult = Array.isArray(result) ? result[0] : result;
    return new File([blobResult], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
      type: 'image/jpeg',
    });
  } catch (error) {
    console.warn('HEIC conversion failed or unsupported, trying fallback:', error);
    return file;
  }
}
