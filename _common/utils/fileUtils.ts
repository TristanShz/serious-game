import _ from "lodash";
import imageCompression from "browser-image-compression";

const files: { [url: string]: File | Blob } = {};

export type TFileData = { path: string; blob: any; indexes?: number[] };
export type TFilesData = TFileData[];

export function getFileUrl(file: File | Blob) {
    return URL.createObjectURL(file);
}

export function storeFile(file: File | Blob) {
    const url = getFileUrl(file);
    files[url] = file;
    return url;
}

export function getFile(url: string) {
    return files[url];
}

export function hasImageExtension(name: string) {
    name = name.toLowerCase();
    return (
        name.endsWith("jpg") ||
        name.endsWith("jpeg") ||
        name.endsWith("png") ||
        name.endsWith("gif") ||
        name.endsWith("svg") ||
        name.endsWith("bmp")
    );
}

export function isBlobUrl(url: string) {
    return url.startsWith("blob:");
}

export function isImage(url: string) {
    let name = url;
    const isBlob = isBlobUrl(url);
    if (isBlob && "name" in getFile(url)) name = (getFile(url) as File).name;
    return hasImageExtension(name);
}

export async function createFileData(url: string, path: string, maxWidthOrHeight?: number, index?: number) {
    if (isBlobUrl(url)) {
        let blob: File | Blob = getFile(url);
        if (!blob) return;
        blob = maxWidthOrHeight && isImage(url) ? await imageCompression(blob as File, { maxWidthOrHeight }) : blob;
        const indexes = index !== undefined ? [index] : undefined;
        return { path, blob, indexes };
    }
}

export async function createFilesData(
    value: undefined | null | string | string[],
    path: string,
    maxWidthOrHeight?: number,
) {
    let filesData: TFilesData | undefined;
    if (value) {
        if (_.isArray(value)) {
            await Promise.all(
                value.map(async (url, index) => {
                    const fileData = await createFileData(url, path, maxWidthOrHeight, index);
                    if (fileData) {
                        filesData = filesData ?? [];
                        filesData.push(fileData);
                    }
                }),
            );
        } else {
            const fileData = await createFileData(value, path, maxWidthOrHeight);
            if (fileData) filesData = [fileData];
        }
    }
    return filesData;
}
