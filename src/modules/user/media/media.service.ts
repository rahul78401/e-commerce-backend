import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async uploadLogic(res, req) {
    try {
      const inputFiles = req.files as Express.Multer.File[];

      if (!inputFiles || inputFiles.length === 0) {
        throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
      }

      const uploadedFiles = [];

      for (const file of inputFiles) {
        const fullPath = path.join(file.destination, file.filename);
        let relativePath = path.relative(process.cwd(), fullPath);

        relativePath = relativePath.replace(/\\/g, '/');

        const media = await this.prisma.media.create({
          data: {
            original_file_name: file.originalname,
            mimetype: file.mimetype,
            file_name: file.filename,
            file_path: relativePath,
            size: file.size,
          },
        });

        uploadedFiles.push({
          media_id: media.media_id,
          original_file_name: media.original_file_name,
          mimetype: media.mimetype,
          size: media.size,
          file_path: media.file_path,
        });
      }

      return res.status(201).json({
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Upload failed',
        error: error.message,
      });
    }
  }
}
