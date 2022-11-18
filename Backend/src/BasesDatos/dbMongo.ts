import express from 'express';

import mongoose from 'mongoose';
import { config } from '../config';



/** Connect to Mongo */
export async function startConnection(){
mongoose
    .connect(config.mongo.url)
    .then(() => {
       console.log('connect to Mongo')
    })
    .catch((error) => console.log(error));
}
