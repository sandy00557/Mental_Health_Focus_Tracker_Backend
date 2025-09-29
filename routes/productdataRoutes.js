// const express=require('express');
// const router=express.Router();


// router.post("/productsadd",async(req,res)=>{
//     try{
//         const products=[
//   {
//     name: "NIMH-Dep",
//     discountAmount: 1,
//     Amount: 5,
//     rating: 9,
//     image: "https://picsum.photos/seed/depression/1024/640",
//     description: "Plain-English guide to depression basics.",
//     bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/publications/depression_1.pdf",
//     motive: "hope"
//   },
//   {
//     name: "SoStress",
//     discountAmount: 1,
//     Amount: 3,
//     rating: 8,
//     image: "https://picsum.photos/seed/stress/1024/640",
//     description: "Quick tips to cope with heavy stress.",
//     bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/publications/I-am-so-stressed-out_0.pdf",
//     motive: "calm"
//   },
//   {
//     name: "NIMH-GAD",
//     discountAmount: 1,
//     Amount: 4,
//     rating: 8,
//     image: "https://picsum.photos/seed/worry/1024/640",
//     description: "Self-help overview of chronic worry (GAD).",
//     bookLink: "https://infocenter.nimh.nih.gov/sites/default/files/2022-02/generalized-anxiety-disorder-when-worry-gets-out-of-control.pdf",
//     motive: "clarity"
//   },
//   {
//     name: "Panic",
//     discountAmount: 1,
//     Amount: 4,
//     rating: 8,
//     image: "https://picsum.photos/seed/panic/1024/640",
//     description: "Fact sheet on panic disorder and support.",
//     bookLink: "https://www.nimh.nih.gov/sites/default/files/documents/health/publications/panic-disorder-when-fear-overwhelms/panic-disorder-when-fear-overwhelms.pdf",
//     motive: "steady"
//   },
//   {
//     name: "Peri-Dep",
//     discountAmount: 1,
//     Amount: 4,
//     rating: 8,
//     image: "https://picsum.photos/seed/perinatal/1024/640",
//     description: "Perinatal depression signs and treatment.",
//     bookLink: "https://www.nimh.nih.gov/sites/default/files/documents/perinatal-depression.pdf",
//     motive: "support"
//   },
//   {
//     name: "SleepVA",
//     discountAmount: 1,
//     Amount: 3,
//     rating: 7,
//     image: "https://picsum.photos/seed/sleep/1024/640",
//     description: "Healthy sleep habits to boost mental health.",
//     bookLink: "https://www.va.gov/wholehealth/veteran-handouts/docs/ChangeHabitsSleepBetter-508Final-10-25-2018.pdf",
//     motive: "rest"
//   },
//   {
//     name: "Bluez-01",
//     discountAmount: 2,
//     Amount: 5,
//     rating: 9,
//     image: "https://picsum.photos/seed/bluez/1024/640",
//     description: "CCI module: understanding depression.",
//     bookLink: "https://www.cci.health.wa.gov.au/-/media/CCI/Consumer-Modules/Back-from-The-Bluez/Back-from-the-Bluez---01---Overview-of-Depression.pdf",
//     motive: "uplift"
//   },
//   {
//     name: "Worry-01",
//     discountAmount: 1,
//     Amount: 4,
//     rating: 8,
//     image: "https://picsum.photos/seed/whatmeworry/1024/640",
//     description: "CCI module: overview of worry and anxiety.",
//     bookLink: "https://www.cci.health.wa.gov.au/~/media/CCI/Consumer-Modules/What-Me-Worry/What-Me-Worry---01---Overview-of-Generalised-Anxiety.pdf",
//     motive: "balance"
//   },
//   {
//     name: "CBT-Guide",
//     discountAmount: 2,
//     Amount: 6,
//     rating: 8,
//     image: "https://picsum.photos/seed/cbt/1024/640",
//     description: "CBT basics for anxiety and mood issues.",
//     bookLink: "https://www.camh.ca/-/media/health-info-files/guides-and-publications/cbt-guide-en.pdf",
//     motive: "skills"
//   },
//   {
//     name: "Dep-Guide",
//     discountAmount: 2,
//     Amount: 6,
//     rating: 8,
//     image: "https://picsum.photos/seed/camh/1024/640",
//     description: "Readable guide to depression care (CAMH).",
//     bookLink: "https://www.camh.ca/-/media/health-info-files/guides-and-publications/depression-guide-en.pdf",
//     motive: "understand"
//   }
// ]

//     }
//     catch(err){
//         console.error('Error in productsadd route:',err);
//         res.status(500).json({
//             status:'fail',
//             message:err.message 
//         })
//     }
// })