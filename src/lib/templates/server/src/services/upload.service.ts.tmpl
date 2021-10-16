import { UploadedFile } from 'express-fileupload';
import * as crypto from 'crypto';
import { basename, extname } from 'path';
import * as filenamify from 'filenamify';
import { promises as fs } from 'fs';
import * as AWS from 'aws-sdk';
import { MediaObject } from '../models/media-object.interface';
import * as sharp from 'sharp';
import { PromiseResult } from 'aws-sdk/lib/request';

export class UploadService {
  public isLocalProvider: boolean;

  constructor() {
    this.isLocalProvider = !(process.env.UPLOAD_PROVIDER === 'do' || process.env.UPLOAD_PROVIDER === 'aws');
  }

  private static async localProviderHandler(localPath: string, data: Buffer, action: 'put' | 'delete'): Promise<void> {
    if (action === 'put') {
      await fs.writeFile(localPath, data);
    } else if (action === 'delete') {
      await fs.unlink(localPath);
    }
  }

  private static async remoteProviderHandler(path: string, mime: string, data: Buffer, action: 'put' | 'delete'):
    Promise<PromiseResult<any, any>> {
    const s3 = new AWS.S3({
        endpoint: process.env.UPLOAD_PROVIDER_ENDPOINT,
        accessKeyId: process.env.UPLOAD_PROVIDER_KEY,
        secretAccessKey: process.env.UPLOAD_PROVIDER_SECRET
      }
    );
    if (action === 'put') {
      const params: AWS.S3.PutObjectRequest = {
        Body: data,
        Bucket: process.env.UPLOAD_PROVIDER_BUCKET,
        Key: path,
        ACL: 'public-read',
        ContentType: mime
      };
      return await s3.putObject(params).promise();
    } else if (action === 'delete') {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: process.env.UPLOAD_PROVIDER_BUCKET,
        Key: path
      };
      return await s3.deleteObject(params).promise();
    }
  }

  public async uploadFile(file: UploadedFile, alternativeText: string = null, caption: string = null): Promise<MediaObject> {
    try {
      const {mediaObject, fileBuffer, thumbBuffer} = await this.getMediaObjectData(file, alternativeText, caption);
      if (this.isLocalProvider) {
        await UploadService.localProviderHandler(`./${mediaObject.path}`, fileBuffer, 'put');
        if (mediaObject.hasOwnProperty('thumbnail')) {
          await UploadService.localProviderHandler(`./${mediaObject.thumbnail.path}`, thumbBuffer, 'put');
        }
      } else {
        await UploadService.remoteProviderHandler(`${mediaObject.path}`, mediaObject.mime, fileBuffer, 'put');
        if (mediaObject.hasOwnProperty('thumbnail')) {
          await UploadService.remoteProviderHandler(`${mediaObject.thumbnail.path}`, mediaObject.thumbnail.mime, thumbBuffer, 'put');
        }
      }
      return mediaObject;
    } catch (err) {
      throw Error('Cannot upload file');
    }
  }

  public async deleteFile(mediaObject: MediaObject): Promise<boolean> {
    try {
      if (this.isLocalProvider) {
        await UploadService.localProviderHandler(`./${mediaObject.path}`, null, 'delete');
        if (mediaObject.hasOwnProperty('thumbnail')) {
          await UploadService.localProviderHandler(`./${mediaObject.thumbnail.path}`, null, 'delete');
        }
      } else {
        await UploadService.remoteProviderHandler(`${mediaObject.path}`, mediaObject.mime, null, 'delete');
        if (mediaObject.hasOwnProperty('thumbnail')) {
          await UploadService.remoteProviderHandler(`${mediaObject.thumbnail.path}`, mediaObject.thumbnail.mime, null, 'delete');
        }
      }
      return true;
    } catch (err) {
      throw Error('Cannot delete file');
    }
  }

  private async getMediaObjectData(file: UploadedFile, alternativeText: string, caption: string):
    Promise<{ mediaObject: MediaObject, fileBuffer: Buffer, thumbBuffer: Buffer }> {
    const ext = extname(file.name);
    const baseFileName = filenamify(basename(file.name, ext));
    const hash = baseFileName + '_' + crypto.randomBytes(5).toString('hex');
    let filePath;
    let fileUrl;
    if (this.isLocalProvider) {
      filePath = `${process.env.UPLOAD_PROVIDER_FOLDER}/${hash}${ext}`;
      fileUrl = `http://${process.env.ADDRESS}:${process.env.PORT}/${filePath}`;
    } else {
      filePath = `${hash}${ext}`;
      fileUrl = `https://${process.env.UPLOAD_PROVIDER_BUCKET}.${process.env.UPLOAD_PROVIDER_ENDPOINT}/${filePath}`;
    }
    let mediaObject: MediaObject = {
      name: baseFileName,
      alternativeText,
      caption,
      width: null,
      height: null,
      hash,
      ext,
      mime: file.mimetype,
      size: file.size,
      url: fileUrl,
      path: filePath,
      provider: process.env.UPLOAD_PROVIDER,
      providerMetadata: null
    };

    let thumbBuffer: Buffer;
    if (isMimeTypePhoto(mediaObject.mime)) {
      const metadata = await sharp(file.data).metadata();
      const thumbnailHash = `thumbnail_${hash}`;
      const thumbnailPath = this.isLocalProvider
        ? `${process.env.UPLOAD_PROVIDER_FOLDER}/${thumbnailHash}${ext}`
        : `${thumbnailHash}${ext}`;
      const thumbnailUrl = this.isLocalProvider
        ? `http://${process.env.ADDRESS}:${process.env.PORT}/${thumbnailPath}`
        : `https://${process.env.UPLOAD_PROVIDER_BUCKET}.${process.env.UPLOAD_PROVIDER_ENDPOINT}/${thumbnailPath}`;
      thumbBuffer = await sharp(file.data).resize(80, 80).toBuffer();
      const thumbnailMetadata = await sharp(thumbBuffer).metadata();
      mediaObject = {
        ...mediaObject,
        width: metadata.width,
        height: metadata.height,
        thumbnail: {
          width: thumbnailMetadata.width,
          height: thumbnailMetadata.height,
          hash: thumbnailHash,
          ext: mediaObject.ext,
          mime: mediaObject.mime,
          size: thumbnailMetadata.size,
          url: thumbnailUrl,
          path: thumbnailPath
        }
      };
    }
    return {mediaObject, fileBuffer: file.data, thumbBuffer};
  }
}

export const isMimeTypePhoto = (mime: string): boolean => {
  const photoTypes = [
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ];
  return photoTypes.indexOf(mime) > -1;
};
