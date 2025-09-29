// const dotenv=require('dotenv');
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});
// const mongoose=require('mongoose');
import mongoose from 'mongoose';
// const Product=require('../model/productsModel');
import Product from '../model/productsModel.js';
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);


const productsData=[
  {
    name: "NIMH-Dep",
    discountAmount: 20,
    Amount: 50,
    rating: 9,
    image: "https://picsum.photos/seed/depression/1024/640",
    description: "Plain-English guide to depression basics.",
    bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/publications/depression_1.pdf",
    motive: "hope"
  },
  {
    name: "SoStress",
    discountAmount: 10,
    Amount: 30,
    rating: 8.5,
    image: "https://picsum.photos/seed/stress/1024/640",
    description: "Quick tips to cope with heavy stress.",
    bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/publications/I-am-so-stressed-out_0.pdf",
    motive: "calm"
  },
  {
    name: "NIMH-GAD",
    discountAmount: 20,
    Amount: 45,
    rating: 8.6,
    image: "https://picsum.photos/seed/worry/1024/640",
    description: "Self-help overview of chronic worry (GAD).",
    bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/2022-02/generalized-anxiety-disorder-when-worry-gets-out-of-control.pdf",
    motive: "clarity"
  },
  {
    name: "Panic",
    discountAmount: 15,
    Amount: 37,
    rating: 7.5,
    image: "https://picsum.photos/seed/panic/1024/640",
    description: "Fact sheet on panic disorder and support.",
    bookLink: "https://www.nimh.nih.gov/sites/default/files/documents/health/publications/panic-disorder-when-fear-overwhelms/panic-disorder-when-fear-overwhelms.pdf",
    motive: "steady"
  },
  {
    name: "Peri-Dep",
    discountAmount: 60,
    Amount: 120,
    rating: 9.5,
    image: "https://picsum.photos/seed/perinatal/1024/640",
    description: "Perinatal depression signs and treatment.",
    bookLink: "https://www.nimh.nih.gov/sites/default/files/documents/perinatal-depression.pdf",
    motive: "support"
  },
  {
    name: "SleepVA",
    discountAmount: 35,
    Amount: 60,
    rating: 7.9,
    image: "https://picsum.photos/seed/sleep/1024/640",
    description: "Healthy sleep habits to boost mental health.",
    bookLink: "https://www.va.gov/wholehealth/veteran-handouts/docs/ChangeHabitsSleepBetter-508Final-10-25-2018.pdf",
    motive: "rest"
  },
  {
    name: "Bluez-01",
    discountAmount: 20,
    Amount: 50,
    rating: 6.8,
    image: "https://picsum.photos/seed/bluez/1024/640",
    description: "CCI module: understanding depression.",
    bookLink: "https://www.cci.health.wa.gov.au/-/media/CCI/Consumer-Modules/Back-from-The-Bluez/Back-from-the-Bluez---01---Overview-of-Depression.pdf",
    motive: "uplift"
  },
  {
    name: "Worry-01",
    discountAmount: 50,
    Amount: 80,
    rating: 8.6,
    image: "https://picsum.photos/seed/whatmeworry/1024/640",
    description: "CCI module: overview of worry and anxiety.",
    bookLink: "https://www.cci.health.wa.gov.au/~/media/CCI/Consumer-Modules/What-Me-Worry/What-Me-Worry---01---Overview-of-Generalised-Anxiety.pdf",
    motive: "balance"
  },
  {
    name: "CBT-Guide",
    discountAmount: 20,
    Amount: 60,
    rating: 8.5,
    image: "https://picsum.photos/seed/cbt/1024/640",
    description: "CBT basics for anxiety and mood issues.",
    bookLink: "https://www.camh.ca/-/media/health-info-files/guides-and-publications/cbt-guide-en.pdf",
    motive: "skills"
  },
  {
    name: "Dep-Guide",
    discountAmount: 20,
    Amount: 60,
    rating: 8.5,
    image: "https://picsum.photos/seed/camh/1024/640",
    description: "Readable guide to depression care (CAMH).",
    bookLink: "https://www.camh.ca/-/media/health-info-files/guides-and-publications/depression-guide-en.pdf",
    motive: "understand"
  }
]

async function seedProducts(){

    try{
        await mongoose.connect(DB);
        /*why do we mongoose.connect seperately in seed.js?
         Even though your backend (server.js) already connects to MongoDB, your seed.js file is a separate script.
         When you run node server.js, your app starts, and mongoose.connect(DB) inside server.js handles the connection.
         But when you run node seed.js, it doesn’t execute your server.js — it runs only the seed.js file. */
         await Product.deleteMany();//clear old data to avoid duplications
         await Product.insertMany(productsData);
         mongoose.connection.close();
    }
    catch(err){
        console.error('Error seeding products:', err);
        process.exit(1);
        /*By convention, an exit code of 0 means success, and any non-zero exit code (usually 1) means failure.
It stops all running operations immediately, including any pending asynchronous tasks or I/O. */
    }
}

seedProducts();


export default productsData;