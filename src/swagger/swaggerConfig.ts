import { INestApplication } from '@nestjs/common';
import 'dotenv/config';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';

const loadSwaggerConfig = async () => {
  const yamlPath = resolve(__dirname, '../../doc/api.yaml');
  const yamlContents = await readFile(yamlPath, 'utf-8');
  return parse(yamlContents);
};

export const setupSwagger = async (app: INestApplication) => {
  const config = await loadSwaggerConfig();
  SwaggerModule.setup('doc', app, config);
};
