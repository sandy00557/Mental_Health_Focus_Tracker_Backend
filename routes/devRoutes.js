import express from 'express';
import Questions from '../model/quizModel.js';
const router=express.Router();

router.post("/addQuiz",async(req,res)=>{
    try{
        const questions = [
      // Existing 30 questions you provided
      {
        questionText: "Which activity is known to reduce stress effectively?",
        options: ["Deep breathing", "Skipping meals", "Multitasking", "Overthinking"],
        answerIndex: 0
      },
      {
        questionText: "How many hours of sleep are generally recommended for adults?",
        options: ["4-5 hours", "6-8 hours", "9-10 hours", "More than 12 hours"],
        answerIndex: 1
      },
      {
        questionText: "Which vitamin is often linked to mood regulation?",
        options: ["Vitamin A", "Vitamin B12", "Vitamin D", "Vitamin K"],
        answerIndex: 2
      },
      {
        questionText: "Mindfulness is best described as:",
        options: [
          "Thinking about the future",
          "Being aware of the present moment",
          "Remembering the past",
          "Avoiding emotions"
        ],
        answerIndex: 1
      },
      {
        questionText: "Which exercise is known to release endorphins?",
        options: ["Walking", "Watching TV", "Eating junk food", "Scrolling social media"],
        answerIndex: 0
      },
      {
        questionText: "A common sign of anxiety is:",
        options: ["Calm breathing", "Muscle tension", "Stable mood", "Steady heartbeat"],
        answerIndex: 1
      },
      {
        questionText: "Which drink can improve hydration and focus?",
        options: ["Coffee", "Water", "Soda", "Energy drink"],
        answerIndex: 1
      },
      {
        questionText: "Journaling can help you:",
        options: ["Forget memories", "Organize thoughts", "Avoid emotions", "Increase stress"],
        answerIndex: 1
      },
      {
        questionText: "Which technique can help during a panic attack?",
        options: ["5-4-3-2-1 grounding", "Ignoring feelings", "Rapid texting", "Overthinking"],
        answerIndex: 0
      },
      {
        questionText: "Spending time outdoors can boost:",
        options: ["Vitamin D levels", "Loneliness", "Stress", "Overthinking"],
        answerIndex: 0
      },
      {
        questionText: "Which food is linked to better brain health?",
        options: ["Blueberries", "Candy", "Chips", "Soda"],
        answerIndex: 0
      },
      {
        questionText: "Cognitive Behavioral Therapy (CBT) focuses on:",
        options: ["Changing negative thoughts", "Exercise only", "Diet plans", "Dream analysis"],
        answerIndex: 0
      },
      {
        questionText: "An important part of self-care is:",
        options: ["Ignoring your needs", "Setting boundaries", "Overworking", "Skipping meals"],
        answerIndex: 1
      },
      {
        questionText: "Meditation can help improve:",
        options: ["Stress levels", "Blood pressure", "Focus", "All of the above"],
        answerIndex: 3
      },
      {
        questionText: "Which habit negatively affects mental health?",
        options: ["Regular exercise", "Social connection", "Chronic sleep deprivation", "Healthy diet"],
        answerIndex: 2
      },
      {
        questionText: "Gratitude journaling helps by:",
        options: ["Increasing negative thinking", "Focusing on positives", "Avoiding emotions", "Causing stress"],
        answerIndex: 1
      },
      {
        questionText: "Which of these is a relaxation technique?",
        options: ["Progressive muscle relaxation", "Overthinking", "Skipping breaks", "Arguing"],
        answerIndex: 0
      },
      {
        questionText: "Social support is important because it:",
        options: ["Increases isolation", "Reduces stress", "Causes anxiety", "Decreases confidence"],
        answerIndex: 1
      },
      {
        questionText: "What can regular physical activity improve?",
        options: ["Mood", "Memory", "Sleep", "All of the above"],
        answerIndex: 3
      },
      {
        questionText: "Overuse of social media can cause:",
        options: ["Better focus", "Improved sleep", "Anxiety and comparison", "More real-life connection"],
        answerIndex: 2
      },
      {
        questionText: "A balanced diet for mental health should include:",
        options: ["Fruits and vegetables", "Only fast food", "Sugary snacks", "Processed meat only"],
        answerIndex: 0
      },
      {
        questionText: "When feeling overwhelmed, it's helpful to:",
        options: ["Take a short break", "Keep pushing harder", "Ignore your feelings", "Work without rest"],
        answerIndex: 0
      },
      {
        questionText: "Breathing exercises can help with:",
        options: ["Stress reduction", "Increased anxiety", "High blood sugar", "Loud noises"],
        answerIndex: 0
      },
      {
        questionText: "What is burnout?",
        options: ["A type of cooking", "Emotional exhaustion from prolonged stress", "Sudden happiness", "Physical injury"],
        answerIndex: 1
      },
      {
        questionText: "Good sleep hygiene includes:",
        options: ["Using phone in bed", "Caffeine before sleep", "Regular sleep schedule", "Eating late-night snacks"],
        answerIndex: 2
      },
      {
        questionText: "Which mineral is linked to mood stability?",
        options: ["Magnesium", "Aluminum", "Lead", "Mercury"],
        answerIndex: 0
      },
      {
        questionText: "Time management can help reduce:",
        options: ["Anxiety", "Productivity", "Happiness", "Free time"],
        answerIndex: 0
      },
      {
        questionText: "Spending time with pets can:",
        options: ["Increase stress", "Lower stress", "Cause isolation", "Decrease happiness"],
        answerIndex: 1
      },
      {
        questionText: "Drinking enough water daily helps with:",
        options: ["Brain function", "Mood", "Energy", "All of the above"],
        answerIndex: 3
      },
      {
        questionText: "Which is a healthy coping strategy?",
        options: ["Talking to a friend", "Binge drinking", "Skipping meals", "Avoiding responsibilities"],
        answerIndex: 0
      },

      // --- Now adding 70 more mental health related questions ---
      {
        questionText: "What is the main purpose of therapy?",
        options: ["To improve mental health", "To avoid problems", "To increase stress", "To cause anxiety"],
        answerIndex: 0
      },
      {
        questionText: "Which hormone is known as the 'happiness hormone'?",
        options: ["Cortisol", "Serotonin", "Adrenaline", "Insulin"],
        answerIndex: 1
      },
      {
        questionText: "Which breathing technique is commonly used for stress relief?",
        options: ["Box breathing", "Rapid breathing", "Holding breath", "Panting"],
        answerIndex: 0
      },
      {
        questionText: "What is a sign of good emotional health?",
        options: ["Ability to cope with stress", "Avoiding problems", "Ignoring feelings", "Staying awake all night"],
        answerIndex: 0
      },
      {
        questionText: "Which food group supports stable mood?",
        options: ["Whole grains", "Refined sugars", "Fried foods", "Processed snacks"],
        answerIndex: 0
      },
      {
        questionText: "Which mental health condition is characterized by persistent sadness?",
        options: ["Anxiety", "Depression", "ADHD", "PTSD"],
        answerIndex: 1
      },
      {
        questionText: "How can physical activity help mental health?",
        options: ["Releases endorphins", "Reduces stress", "Improves sleep", "All of the above"],
        answerIndex: 3
      },
      {
        questionText: "Which is a common grounding technique?",
        options: ["Naming five things you can see", "Ignoring surroundings", "Fast breathing", "Daydreaming"],
        answerIndex: 0
      },
      {
        questionText: "What does 'self-compassion' mean?",
        options: ["Being kind to yourself", "Always blaming yourself", "Ignoring yourself", "Being selfish"],
        answerIndex: 0
      },
      {
        questionText: "Which daily habit helps improve sleep?",
        options: ["Consistent bedtime", "Using phone in bed", "Late caffeine", "Irregular naps"],
        answerIndex: 0
      },
      {
        questionText: "What is a common symptom of chronic stress?",
        options: ["Low energy", "Improved focus", "Happiness", "Relaxation"],
        answerIndex: 0
      },
      {
        questionText: "Which nutrient is important for brain function?",
        options: ["Omega-3 fatty acids", "Refined sugar", "Saturated fat", "Trans fats"],
        answerIndex: 0
      },
      {
        questionText: "What is the purpose of a 'digital detox'?",
        options: ["To reduce screen time", "To increase screen time", "To ignore mental health", "To overuse devices"],
        answerIndex: 0
      },
      {
        questionText: "Which of these can help improve focus?",
        options: ["Mindfulness meditation", "Multitasking", "Scrolling social media", "Skipping breaks"],
        answerIndex: 0
      },
      {
        questionText: "What is 'emotional resilience'?",
        options: ["Bouncing back from stress", "Avoiding stress forever", "Never feeling emotions", "Ignoring problems"],
        answerIndex: 0
      },
      {
        questionText: "Which mineral supports relaxation?",
        options: ["Magnesium", "Lead", "Mercury", "Aluminum"],
        answerIndex: 0
      },
      {
        questionText: "What is the first step in managing anxiety?",
        options: ["Acknowledging it", "Ignoring it", "Avoiding people", "Overthinking"],
        answerIndex: 0
      },
      {
        questionText: "Which activity can help reduce symptoms of depression?",
        options: ["Regular exercise", "Isolation", "Skipping meals", "Sleeping all day"],
        answerIndex: 0
      },
      {
        questionText: "How can you practice gratitude daily?",
        options: ["Journaling three things you’re grateful for", "Focusing on problems", "Avoiding positives", "Complaining daily"],
        answerIndex: 0
      },
      {
        questionText: "What is a common sign of burnout?",
        options: ["Loss of motivation", "High energy", "Optimism", "Calm focus"],
        answerIndex: 0
      },
      {
        questionText: "Which drink can help improve mood naturally?",
        options: ["Green tea", "Energy drinks", "Sugary soda", "Alcohol"],
        answerIndex: 0
      },
      {
        questionText: "What is the role of sleep in mental health?",
        options: ["Restores brain function", "Increases stress", "Reduces memory", "None of the above"],
        answerIndex: 0
      },
      {
        questionText: "Which is an example of positive self-talk?",
        options: ["I can handle this", "I’m worthless", "I always fail", "I hate myself"],
        answerIndex: 0
      },
      {
        questionText: "What type of therapy helps change thought patterns?",
        options: ["Cognitive Behavioral Therapy", "Dance therapy", "Dream analysis", "None"],
        answerIndex: 0
      },
      {
        questionText: "Which color is often associated with calmness?",
        options: ["Blue", "Red", "Yellow", "Black"],
        answerIndex: 0
      },
      {
        questionText: "What does mindfulness encourage?",
        options: ["Present moment awareness", "Avoiding feelings", "Thinking about the past", "Overplanning"],
        answerIndex: 0
      },
      {
        questionText: "Which is a healthy morning habit?",
        options: ["Stretching", "Checking emails immediately", "Skipping breakfast", "Scrolling in bed"],
        answerIndex: 0
      },
      {
        questionText: "What can deep breathing do?",
        options: ["Lower heart rate", "Increase stress", "Cause panic", "Raise blood pressure"],
        answerIndex: 0
      },
      {
        questionText: "What is the recommended daily water intake for adults?",
        options: ["About 2 liters", "0.5 liters", "4 liters of soda", "Unlimited coffee"],
        answerIndex: 0
      },
      {
        questionText: "Which is a sign of healthy boundaries?",
        options: ["Saying no when needed", "Always saying yes", "Avoiding all people", "Ignoring needs"],
        answerIndex: 0
      },
      {
        questionText: "What can help with decision fatigue?",
        options: ["Prioritizing tasks", "Overthinking", "Avoiding choices", "Working non-stop"],
        answerIndex: 0
      },
      {
        questionText: "Which light exposure helps regulate sleep cycles?",
        options: ["Morning sunlight", "Blue light at night", "Dim rooms all day", "Flashing lights"],
        answerIndex: 0
      },
      {
        questionText: "What is 'self-care'?",
        options: ["Activities that improve well-being", "Selfishness", "Avoiding people", "Ignoring needs"],
        answerIndex: 0
      },
      {
        questionText: "Which hobby can improve mental health?",
        options: ["Gardening", "Overworking", "Skipping rest", "Arguing online"],
        answerIndex: 0
      },
      {
        questionText: "What does 'sleep hygiene' refer to?",
        options: ["Healthy sleep habits", "Cleaning your bed", "Sleeping less", "Avoiding sleep"],
        answerIndex: 0
      },
      {
        questionText: "What does chronic stress increase the risk of?",
        options: ["Heart disease", "High blood pressure", "Depression", "All of the above"],
        answerIndex: 3
      },
      {
        questionText: "Which is a healthy evening routine?",
        options: ["Reading a book", "Using phone in bed", "Caffeine after dinner", "Loud TV before sleep"],
        answerIndex: 0
      },
      {
        questionText: "What is the main benefit of yoga?",
        options: ["Reduces stress", "Causes anxiety", "Increases anger", "Improves insomnia"],
        answerIndex: 0
      },
      {
        questionText: "What is one way to prevent burnout?",
        options: ["Taking regular breaks", "Working 16 hours daily", "Skipping vacations", "Avoiding rest"],
        answerIndex: 0
      },
      {
        questionText: "What does 'grounding' help with?",
        options: ["Anxiety", "Injury", "Hunger", "Dehydration"],
        answerIndex: 0
      },
      {
        questionText: "Which is a stress-reducing hobby?",
        options: ["Painting", "Overthinking", "Procrastinating", "Scrolling endlessly"],
        answerIndex: 0
      },
      {
        questionText: "Which is a social activity that boosts mood?",
        options: ["Volunteering", "Isolating", "Avoiding people", "Ignoring friends"],
        answerIndex: 0
      },
      {
        questionText: "What is a quick way to reset focus during work?",
        options: ["5-minute break", "Keep working without pause", "Drink soda", "Check phone constantly"],
        answerIndex: 0
      },
      {
        questionText: "Which mental health benefit comes from gratitude?",
        options: ["More positive thinking", "Increased stress", "Less sleep", "Higher anxiety"],
        answerIndex: 0
      },
      {
        questionText: "Which sleep position is generally healthiest?",
        options: ["On your back", "Face down", "Curled up tightly", "Upside down"],
        answerIndex: 0
      },
      {
        questionText: "What does 'emotional awareness' mean?",
        options: ["Recognizing your feelings", "Ignoring emotions", "Suppressing emotions", "Forgetting feelings"],
        answerIndex: 0
      },
      {
        questionText: "Which can help regulate mood swings?",
        options: ["Balanced diet", "Skipping meals", "High sugar intake", "No exercise"],
        answerIndex: 0
      },
      {
        questionText: "What is the main benefit of walking in nature?",
        options: ["Reduces stress", "Increases anxiety", "Improves social isolation", "None"],
        answerIndex: 0
      },
      {
        questionText: "Which is a healthy way to deal with conflict?",
        options: ["Calm communication", "Yelling", "Ignoring", "Revenge"],
        answerIndex: 0
      },
      {
        questionText: "What can laughter do for mental health?",
        options: ["Reduce stress", "Increase stress", "Cause headaches", "Lower immunity"],
        answerIndex: 0
      },
      {
        questionText: "Which activity can improve self-esteem?",
        options: ["Learning new skills", "Avoiding challenges", "Self-criticism", "Comparison"],
        answerIndex: 0
      },
      {
        questionText: "Which is a relaxation practice?",
        options: ["Meditation", "Arguing", "Skipping rest", "Overworking"],
        answerIndex: 0
      },
      {
        questionText: "What is a mental benefit of exercise?",
        options: ["Better mood", "Less focus", "More stress", "Worse sleep"],
        answerIndex: 0
      },
      {
        questionText: "Which is an effective break activity?",
        options: ["Stretching", "Scrolling social media", "Watching intense news", "Checking emails"],
        answerIndex: 0
      },
      {
        questionText: "What can help you stay mindful during meals?",
        options: ["Eating slowly", "Watching TV", "Eating while working", "Rushing"],
        answerIndex: 0
      }
    ];

    await Questions.insertMany(questions);
    res.status(201).json({
        status:'success',
        message:'Quiz questions added succcessfully'
    })
    }
    catch(err){
        res.status(500).json({
            status:'fail',
            message:err.message
        })
    }
})

export default router;