const questions = {
    listening: [
        {
            id: 1,
            audioSrc: "assets/audio/1.mp3",
            question: "What does the man mean?",
            options: [  
                "The coffee is much better this morning.",
                "He's feeling bitter this morning.",
                "The coffee isn't very good.",
                "He cannot taste the butter.",
            ],
            correctAnswer: "The coffee isn't very good.",
            pembahasan:
                "Jawaban C benar karena konteks percakapan menunjukkan pria tersebut mengeluhkan kualitas kopi, bukan menyatakan bahwa lebih baik atau tentang rasa lainnya.",
        },
        {
            id: 2,
            audioSrc: "assets/audio/2.mp3",
            question: "What does the man mean?",
            options: [
                "The two classes meet in an hour and a half.",
                "The class meets three hours per week.",
                "Each half of the class is an hour long.",
                "Two times a week the class meets for an hour",
            ],
            correctAnswer: "The class meets three hours per week.",
            pembahasan:
                "Jawaban B tepat karena menunjukkan jumlah pertemuan kelas yang disebut pria tersebut, yakni tiga jam per minggu.",
        },
        {
            id: 3,
            audioSrc: "assets/audio/3.mp3",
            question: "What does the woman mean?",
            options: [
                "A few minutes ago, the flight departed.",
                "The flight will start in a while.",
                "They are frightened about the departure.",
                "The plane is going to take off soon.",
            ],
            correctAnswer: "The plane is going to take off soon.",
            pembahasan:
                "Jawaban D benar karena si wanita menyatakan bahwa pesawat akan segera lepas landas, bukan sudah berangkat atau dalam suasana takut.",
        },
        {
            id: 4,
            audioSrc: "assets/audio/4.mp3",
            question: "What does the man mean?",
            options: [
                "He hasn't yet begun his project.",
                "He's supposed to do his science project next week.",
                "He needs to start working on changing the due date.",
                "He's been working steadily on his science project.",
            ],
            correctAnswer: "He hasn't yet begun his project.",
            pembahasan:
                "Jawaban A tepat karena si pria menyampaikan bahwa ia belum memulai proyeknya, bukan bahwa ia sedang mengerjakannya atau menjadwalkannya minggu depan.",
        },
        {
            id: 5,
            audioSrc: "assets/audio/5.mp3",
            question: "Where does this conversation probably take place?",
            options: [
                "At the post office.",
                "In a florist shop.",
                "In a restaurant.",
                "In a hospital delivery room.",
            ],
            correctAnswer: "In a florist shop.",
            pembahasan:
                "Jawaban B benar karena konteks pembicaraan menyiratkan bahwa mereka sedang berada di toko bunga, bukan tempat lain.",
        },
        {
            id: 6,
            audioSrc: "assets/audio/6.mp3",
            question: "What does the man mean?",
            options: [
                "The professor drowned the cells in a lab.",
                "The topic was presented in a boring way.",
                "The professor divided the lecture into parts.",
                "The biologist tried to sell the results of the experiment.",
            ],
            correctAnswer: "The topic was presented in a boring way.",
            pembahasan:
                "Jawaban B tepat karena ungkapan 'drowned' dalam konteks ini bermakna membosankan atau terlalu rumit, bukan literal.",
        },
        {
            id: 7,
            audioSrc: "assets/audio/7.mp3",
            question: "What does the woman mean?",
            options: [
                "She needs to get a driver's license.",
                "It is impossible to cash a check without two pieces of identification.",
                "The man should check to see if he needs credit.",
                "A credit card can be used to get a driver's license.",
            ],
            correctAnswer:
                "It is impossible to cash a check without two pieces of identification.",
            pembahasan:
                "Jawaban B benar karena si wanita menyatakan perlunya dua identitas untuk mencairkan cek.",
        },
        {
            id: 8,
            audioSrc: "assets/audio/8.mp3",
            question: "What does the man mean?",
            options: [
                "Housing within his budget is hard to locate.",
                "It's hard to find his house in New York.",
                "He can't afford to move his house to New York.",
                "Housing in New York is unavailable.",
            ],
            correctAnswer: "Housing within his budget is hard to locate.",
            pembahasan:
                "Jawaban A benar karena si pria menyampaikan sulitnya mencari tempat tinggal yang terjangkau di New York.",
        },
        {
            id: 9,
            audioSrc: "assets/audio/9.mp3",
            question: "What does the man mean?",
            options: [
                "The boss was working on the reports.",
                "He would have to finish the reports before the end of next month.",
                "He was directed to stay late and finish some work.",
                "He could finish the reports at home.",
            ],
            correctAnswer: "He was directed to stay late and finish some work.",
            pembahasan:
                "Jawaban C tepat karena ia mengatakan harus lembur menyelesaikan laporan, atas arahan atasan.",
        },
        {
            id: 10,
            audioSrc: "assets/audio/10.mp3",
            question: "What does the woman mean?",
            options: [
                "The boisterous students made the teacher mad.",
                "The teacher angered the students with the exam results.",
                "The students were angry that the teacher was around.",
                "The angered students complained to the teacher.",
            ],
            correctAnswer: "The boisterous students made the teacher mad.",
            pembahasan:
                "Jawaban A benar karena si wanita menyiratkan bahwa siswa yang ribut membuat guru marah.",
        },
        {
            id: 11,
            audioSrc: "assets/audio/11.mp3",
            question: "What does the man mean?",
            options: [
                "The prices are reasonable.",
                "The store is too far out of town.",
                "He would like the woman to repeat what she said.",
                "He agrees with the woman.",
            ],
            correctAnswer: "He agrees with the woman.",
            pembahasan:
                "Jawaban D tepat karena si pria menyetujui pernyataan wanita dalam percakapan.",
        },
        {
            id: 12,
            audioSrc: "assets/audio/12.mp3",
            question: "What does the man mean?",
            options: [
                "It has rarely rained this much.",
                "It hardly rained this year.",
                "It is barely raining this year.",
                "It seldom rains so little.",
            ],
            correctAnswer: "It has rarely rained this much.",
            pembahasan:
                "Jawaban A benar karena pria tersebut membicarakan hujan yang sangat jarang terjadi sebanyak ini.",
        },
        {
            id: 13,
            audioSrc: "assets/audio/13.mp3",
            question: "What does professor Martin say about the student?",
            options: [
                "He needs to do a better job writing questions.",
                "His writing must certainly be improved.",
                "Without the questions, he cannot write the answers.",
                "He needs to understand the written questions better.",
            ],
            correctAnswer: "His writing must certainly be improved.",
            pembahasan:
                "Jawaban B benar karena profesor menekankan pentingnya peningkatan kualitas tulisan siswa.",
        },
        {
            id: 14,
            audioSrc: "assets/audio/14.mp3",
            question: "What does the man mean?",
            options: [
                "The agent was standing in line with his passport.",
                "The line to get new passports is very long.",
                "The woman must wait her turn to get her passport checked.",
                "He can check her passport instead of the agent.",
            ],
            correctAnswer:
                "The woman must wait her turn to get her passport checked.",
            pembahasan:
                "Jawaban C tepat karena si pria menyuruh wanita tersebut antre untuk pemeriksaan paspor.",
        },
        {
            id: 15,
            audioSrc: "assets/audio/15.mp3",
            question: "What does the woman say about Paul?",
            options: [
                "He couldn't finish closing the library book.",
                "He hadn't finished the library assignment, but he was close.",
                "He was working on the assignment when the library closed.",
                "His homework was incomplete because the library wasn't open.",
            ],
            correctAnswer:
                "His homework was incomplete because the library wasn't open.",
            pembahasan:
                "Jawaban D benar karena wanita tersebut menyatakan Paul tidak bisa menyelesaikan tugas karena perpustakaan tutup.",
        },
        {
            id: 16,
            audioSrc: "assets/audio/16.mp3",
            question: "What does the man mean?",
            options: [
                "All the lawyer's preparation did no good.",
                "The lawyer prepared nothing for the case.",
                "It wasn't work for the lawyer to prepare for the case.",
                "The lawyer didn't work to prepare for the case.",
            ],
            correctAnswer: "All the lawyer's preparation did no good.",
            pembahasan:
                "Jawaban A benar karena si pria menyatakan Semua persiapan pengacara tidak ada gunanya",
        },
        {
            id: 17,
            audioSrc: "assets/audio/17.mp3",
            question: "What does the man mean?",
            options: [
                "The history class begins next week.",
                "He thinks the papers should be turned in next week.",
                "He has already done the paper for next week.",
                "The papers are not due next week.",
            ],
            correctAnswer:
                "He thinks the papers should be turned in next week.",
            pembahasan:
                "Jawaban B benar karena Dia pikir makalahnya harus diserahkan minggu depan.",
        },
        {
            id: 18,
            audioSrc: "assets/audio/18.mp3",
            question: "What does the man say he did last night?",
            options: [
                "He studied last night because he had to.",
                "He tried to study last night, but the material was too hard.",
                "He couldn't study last night because he was very tired.",
                "He studied last night because he was bored.",
            ],
            correctAnswer:
                "He couldn't study last night because he was very tired.",
            pembahasan:
                "Jawaban C benar karena si pria mengatakan ia terlalu lelah untuk belajar tadi malam.",
        },
        {
            id: 19,
            audioSrc: "assets/audio/19.mp3",
            question: "What does the woman say about Gloria?",
            options: [
                "She goes to a movie every year.",
                "She hasn't gone to a movie yet this year, but last year she did.",
                "She doesn't go to a movie unless she has the time.",
                "She hasn't seen a movie for a long time.",
            ],
            correctAnswer: "She hasn't seen a movie for a long time.",
            pembahasan:
                "Jawaban D benar karena wanita itu mengatakan bahwa Gloria sudah lama tidak menonton film.",
        },
        {
            id: 20,
            audioSrc: "assets/audio/20.mp3",
            question: "What does the woman say about Harvey?",
            options: [
                "He turned around to answer the teacher's questions.",
                "He is an intelligent student.",
                "He must have been embarrassed.",
                "He looked in the red book for the answer to the questions.",
            ],
            correctAnswer: "He must have been embarrassed.",
            pembahasan:
                "Jawaban C tepat karena wanita itu menyiratkan bahwa Harvey merasa malu atas suatu kejadian.",
        },
    ],
    structure: [
        {
            id: 1,
            question: "The Eiffel Tower ____ in Paris, France.",
            options: ["located", "is located", "locating", "is locating"],
            correctAnswer: "is located",
            pembahasan:
                "Kalimat ini membutuhkan bentuk pasif dari kata kerja karena Eiffel Tower tidak melakukan aksi, tetapi dikenai aksi. Bentuk pasif yang benar adalah 'is located'.",
        },
        {
            id: 2,
            question:
                "The teacher asked the students ____ their homework before class.",
            options: ["to finish", "finish", "finishing", "to finishing"],
            correctAnswer: "to finish",
            pembahasan:
                "Setelah kata kerja seperti 'ask', bentuk infinitive dengan 'to' harus digunakan. Jadi, 'to finish' adalah pilihan yang benar.",
        },
        {
            id: 3,
            question:
                "Neither the students nor the teacher ____ happy about the schedule change.",
            options: ["are", "were", "is", "be"],
            correctAnswer: "is",
            pembahasan:
                "Ketika menggunakan 'neither...nor', subjek yang paling dekat dengan kata kerja menentukan bentuk kata kerja. Karena 'teacher' adalah tunggal, gunakan 'is'.",
        },
        {
            id: 4,
            question: "Each of the players ____ a locker in the changing room.",
            options: ["has", "have", "having", "had"],
            correctAnswer: "has",
            pembahasan:
                "'Each' dianggap sebagai subjek tunggal, jadi kata kerja yang digunakan harus 'has'.",
        },
        {
            id: 5,
            question:
                "Hardly ____ the plane taken off when it started to rain.",
            options: ["had", "has", "have", "was"],
            correctAnswer: "had",
            pembahasan:
                "Struktur 'Hardly...when' biasanya diikuti oleh past perfect tense, jadi bentuk yang benar adalah 'had'.",
        },
        {
            id: 6,
            question:
                "The book on the shelf, along with the notebooks, ____ missing.",
            options: ["are", "is", "were", "have"],
            correctAnswer: "is",
            pembahasan:
                "Subjek utama adalah 'The book', jadi kata kerja harus mengikuti subjek tunggal yaitu 'is'.",
        },
        {
            id: 7,
            question:
                "She would rather that he ____ more polite to her parents.",
            options: ["be", "is", "was", "were"],
            correctAnswer: "be",
            pembahasan:
                "Setelah 'would rather that', bentuk subjunctive digunakan, yaitu 'be'.",
        },
        {
            id: 8,
            question:
                "Not only the students but also the teacher ____ confused by the new policy.",
            options: ["are", "is", "were", "have been"],
            correctAnswer: "is",
            pembahasan:
                "Dalam struktur 'Not only...but also', subjek terdekat yaitu 'the teacher' menentukan kata kerja. Karena 'teacher' adalah tunggal, gunakan 'is'.",
        },
        {
            id: 9,
            question:
                "It was recommended that each participant ____ their own laptop.",
            options: ["bring", "brings", "brought", "bringing"],
            correctAnswer: "bring",
            pembahasan:
                "Setelah kata kerja seperti 'recommend', bentuk subjunctive digunakan, yaitu bentuk dasar kata kerja: 'bring'.",
        },
        {
            id: 10,
            question: "If I ____ you, I would accept the offer.",
            options: ["was", "were", "am", "be"],
            correctAnswer: "were",
            pembahasan:
                "Dalam conditional sentence tipe 2, gunakan 'were' untuk semua subjek setelah 'if'.",
        },
        {
            id: 11,
            question: "He didn't mind ____ late to the meeting.",
            options: ["be", "to be", "being", "been"],
            correctAnswer: "being",
            pembahasan:
                "Setelah 'mind', bentuk gerund harus digunakan, yaitu 'being'.",
        },
        {
            id: 12,
            question: "The information in the documents ____ to be inaccurate.",
            options: ["appear", "appears", "appearing", "appeared"],
            correctAnswer: "appears",
            pembahasan:
                "Subjek utama adalah 'The information', bentuk tunggal, jadi kata kerja harus 'appears'.",
        },
        {
            id: 13,
            question: "By the time we arrived, the movie ____.",
            options: ["had started", "has started", "was starting", "started"],
            correctAnswer: "had started",
            pembahasan:
                "Kalimat ini membutuhkan past perfect tense karena satu aksi terjadi sebelum aksi lainnya di masa lalu.",
        },
        {
            id: 14,
            question: "I wish she ____ here now.",
            options: ["was", "were", "is", "be"],
            correctAnswer: "were",
            pembahasan:
                "Setelah 'I wish' untuk keadaan tidak nyata di masa sekarang, gunakan bentuk 'were'.",
        },
        {
            id: 15,
            question: "He speaks English as if he ____ a native speaker.",
            options: ["is", "was", "were", "be"],
            correctAnswer: "were",
            pembahasan:
                "'As if' diikuti oleh bentuk subjunctive ketika menggambarkan sesuatu yang tidak nyata.",
        },
        {
            id: 16,
            question: "The manager insisted that the report ____ immediately.",
            options: ["be finished", "finished", "was finished", "is finished"],
            correctAnswer: "be finished",
            pembahasan:
                "Setelah 'insist that', bentuk subjunctive digunakan: 'be + past participle'.",
        },
        {
            id: 17,
            question:
                "This museum ____ more than one million visitors every year.",
            options: ["attract", "attracts", "is attracting", "attracting"],
            correctAnswer: "attracts",
            pembahasan:
                "Subjek tunggal 'This museum' memerlukan kata kerja bentuk tunggal 'attracts'.",
        },
        {
            id: 18,
            question: "____ he studied hard, he failed the exam.",
            options: ["Although", "Because", "Despite", "Because of"],
            correctAnswer: "Although",
            pembahasan:
                "Gunakan 'Although' untuk menunjukkan kontras antara dua ide.",
        },
        {
            id: 19,
            question: "He asked me where ____.",
            options: ["do I live", "I live", "I lived", "did I live"],
            correctAnswer: "I lived",
            pembahasan:
                "Dalam indirect question (kalimat tidak langsung), gunakan susunan subjek + kata kerja tanpa inversi.",
        },
        {
            id: 20,
            question:
                "The woman ____ car was stolen reported it to the police.",
            options: ["who", "which", "whose", "whom"],
            correctAnswer: "whose",
            pembahasan:
                "Gunakan 'whose' untuk menunjukkan kepemilikan dalam klausa relatif.",
        },
        {
            id: 21,
            question:
                "The longer the explanation, ____ the students understand.",
            options: [
                "the more difficult",
                "more difficult",
                "most difficult",
                "the most difficult",
            ],
            correctAnswer: "the more difficult",
            pembahasan:
                "Struktur 'the comparative..., the comparative...' digunakan untuk membandingkan dua hal yang meningkat bersamaan.",
        },
        {
            id: 22,
            question: "I don't know where ____ the keys.",
            options: ["he keeps", "does he keep", "did he keep", "he keep"],
            correctAnswer: "he keeps",
            pembahasan:
                "Kalimat tidak langsung membutuhkan urutan kata: subjek + kata kerja.",
        },
        {
            id: 23,
            question: "Only after the storm was over ____ outside.",
            options: ["we went", "went we", "did we go", "we had gone"],
            correctAnswer: "did we go",
            pembahasan:
                "Kalimat inversi digunakan setelah 'Only after', maka susunan: auxiliary + subject + verb.",
        },
        {
            id: 24,
            question: "The committee ____ decided to postpone the meeting.",
            options: ["has", "have", "is", "are"],
            correctAnswer: "has",
            pembahasan:
                "'Committee' dianggap sebagai subjek tunggal dalam American English, jadi gunakan 'has'.",
        },
        {
            id: 25,
            question: "There ____ many reasons for the company's success.",
            options: ["is", "are", "was", "has"],
            correctAnswer: "are",
            pembahasan:
                "'There are' digunakan karena 'many reasons' adalah jamak.",
        },
        {
            id: 26,
            question: "He was the first student ____ the test.",
            options: ["finished", "finishing", "to finish", "finish"],
            correctAnswer: "to finish",
            pembahasan:
                "Gunakan 'the first + to-infinitive' untuk menunjukkan urutan atau prioritas.",
        },
        {
            id: 27,
            question: "Despite ____ late, he completed the assignment on time.",
            options: ["arrive", "arrived", "arriving", "he arrived"],
            correctAnswer: "arriving",
            pembahasan: "Setelah 'despite', gunakan bentuk gerund.",
        },
        {
            id: 28,
            question: "No sooner had I closed the door ____ the phone rang.",
            options: ["when", "then", "than", "while"],
            correctAnswer: "than",
            pembahasan:
                "Gunakan 'No sooner... than' untuk menunjukkan dua kejadian berurutan.",
        },
        {
            id: 29,
            question: "He is not only intelligent ____ also very friendly.",
            options: ["and", "but", "but is", "but also"],
            correctAnswer: "but also",
            pembahasan:
                "'Not only... but also' adalah pasangan konjungsi yang digunakan bersama.",
        },
        {
            id: 30,
            question:
                "The man, ____ car was stolen, reported it to the police.",
            options: ["who", "which", "whose", "whom"],
            correctAnswer: "whose",
            pembahasan:
                "'Whose' digunakan untuk menunjukkan kepemilikan dalam klausa relatif.",
        },
        {
            id: 31,
            question: "The more you practice, ____ you become.",
            options: [
                "more confident",
                "the more confident",
                "most confident",
                "the most confident",
            ],
            correctAnswer: "the more confident",
            pembahasan:
                "Gunakan struktur 'the more..., the more...' untuk menyatakan peningkatan paralel.",
        },
        {
            id: 32,
            question: "He suggested that she ____ earlier to catch the train.",
            options: ["leaves", "left", "leave", "leaving"],
            correctAnswer: "leave",
            pembahasan:
                "Setelah 'suggest that', gunakan bentuk subjunctive yaitu bentuk dasar kata kerja.",
        },
        {
            id: 33,
            question: "The student didn't know what ____ for the project.",
            options: ["to choose", "choose", "choosing", "chose"],
            correctAnswer: "to choose",
            pembahasan:
                "Setelah 'what', gunakan bentuk infinitive jika tidak ada subjek eksplisit.",
        },
        {
            id: 34,
            question:
                "Not until the lights were turned on ____ the mess in the room.",
            options: ["we saw", "saw we", "did we see", "we had seen"],
            correctAnswer: "did we see",
            pembahasan:
                "'Not until' membutuhkan inversi: auxiliary + subject + verb.",
        },
        {
            id: 35,
            question: "It is important that he ____ present at the meeting.",
            options: ["is", "be", "was", "will be"],
            correctAnswer: "be",
            pembahasan:
                "'It is important that...' diikuti oleh bentuk subjunctive: 'be'.",
        },
        {
            id: 36,
            question: "Each of the answers ____ correct.",
            options: ["are", "were", "is", "have been"],
            correctAnswer: "is",
            pembahasan:
                "'Each' selalu dianggap sebagai subjek tunggal, sehingga gunakan 'is'.",
        },
        {
            id: 37,
            question: "The team ____ winning the game when it started to rain.",
            options: ["was", "were", "is", "are"],
            correctAnswer: "was",
            pembahasan:
                "'Team' dianggap sebagai subjek tunggal dalam American English.",
        },
        {
            id: 38,
            question: "By next month, she ____ here for two years.",
            options: ["will be", "has been", "will have been", "is"],
            correctAnswer: "will have been",
            pembahasan:
                "Gunakan future perfect tense untuk menyatakan durasi sampai masa depan.",
        },
        {
            id: 39,
            question: "He acted as if he ____ the manager.",
            options: ["is", "was", "were", "be"],
            correctAnswer: "were",
            pembahasan:
                "Gunakan bentuk subjunctive 'were' setelah 'as if' untuk situasi tidak nyata.",
        },
        {
            id: 40,
            question: "Neither of the answers ____ correct.",
            options: ["is", "are", "have been", "were"],
            correctAnswer: "is",
            pembahasan:
                "'Neither' dianggap sebagai subjek tunggal, jadi gunakan 'is'.",
        },
    ],
    reading: [
        {
            id: 1,
            passage:
                "The honeybee is a social insect that lives in a highly organized colony. Each colony has a queen, drones, and worker bees. The queen is the only fertile female and lays all the eggs. Worker bees, which are sterile females, maintain the hive, care for the young, and gather food.",
            question: "What is the role of the queen bee in the colony?",
            options: [
                "To gather food for the hive",
                "To maintain the hive structure",
                "To care for the young bees",
                "To lay eggs and reproduce",
            ],
            correctAnswer: "To lay eggs and reproduce",
            pembahasan:
                "Jawaban D benar karena disebutkan dalam teks bahwa ratu lebah (queen) adalah satu-satunya betina yang subur dan bertugas meletakkan semua telur.",
        },
        {
            id: 2,
            passage:
                "Volcanoes are openings in the Earth's crust through which molten rock, ash, and gases escape. Some volcanoes erupt explosively, while others have slow lava flows. Volcanic eruptions can significantly alter the landscape and affect global climate.",
            question:
                "Which of the following is NOT mentioned as a result of volcanic activity?",
            options: [
                "Changes in landscape",
                "Release of gases",
                "Formation of earthquakes",
                "Impact on global climate",
            ],
            correctAnswer: "Formation of earthquakes",
            pembahasan:
                "Jawaban C benar karena teks tidak menyebutkan gempa bumi sebagai hasil langsung dari aktivitas gunung berapi, sementara ketiga pilihan lain disebutkan.",
        },
        {
            id: 3,
            passage:
                "Photosynthesis is the process by which green plants use sunlight to convert carbon dioxide and water into glucose and oxygen. This process takes place in the chloroplasts of plant cells and is essential for providing energy to most life forms on Earth.",
            question: "Where does photosynthesis occur in plant cells?",
            options: ["Mitochondria", "Nucleus", "Chloroplasts", "Cytoplasm"],
            correctAnswer: "Chloroplasts",
            pembahasan:
                "Jawaban C benar karena teks menyatakan bahwa proses fotosintesis terjadi di kloroplas sel tumbuhan.",
        },
        {
            id: 4,
            passage:
                "The Great Depression was a severe worldwide economic downturn that lasted throughout the 1930s. It began in the United States after the stock market crash of October 1929 and led to high unemployment and widespread poverty.",
            question: "What event triggered the start of the Great Depression?",
            options: [
                "World War I",
                "A stock market crash",
                "Bank failures",
                "Natural disasters",
            ],
            correctAnswer: "A stock market crash",
            pembahasan:
                "Jawaban B benar karena teks secara eksplisit menyebutkan bahwa Depresi Besar dimulai setelah jatuhnya pasar saham pada Oktober 1929.",
        },
        {
            id: 5,
            passage:
                "Bats are the only mammals capable of true flight. Unlike birds, their wings are made of a thin membrane stretched over elongated finger bones. Bats use echolocation to navigate and find food in the dark.",
            question: "How do bats navigate in the dark?",
            options: [
                "By following the moonlight",
                "Using their excellent vision",
                "With the help of echolocation",
                "By flying in flocks",
            ],
            correctAnswer: "With the help of echolocation",
            pembahasan:
                "Jawaban C benar karena dalam teks disebutkan bahwa kelelawar menggunakan ekolokasi untuk bernavigasi dan mencari makanan.",
        },
        {
            id: 6,
            passage:
                "Saturn is the sixth planet from the sun and is known for its prominent ring system. These rings are made up of ice particles, rock debris, and dust. Saturn is a gas giant, primarily composed of hydrogen and helium.",
            question: "What are Saturn's rings made of?",
            options: [
                "Gas and fire",
                "Liquid water and stone",
                "Ice particles, rock debris, and dust",
                "Molten metal",
            ],
            correctAnswer: "Ice particles, rock debris, and dust",
            pembahasan:
                "Jawaban C benar karena teks menyebutkan bahwa cincin Saturnus terdiri dari partikel es, puing batuan, dan debu.",
        },
        {
            id: 7,
            passage:
                "Marie Curie was a pioneering scientist known for her research on radioactivity. She was the first woman to win a Nobel Prize and remains the only person to have won Nobel Prizes in two different sciences—Physics and Chemistry.",
            question:
                "What makes Marie Curie unique among Nobel Prize winners?",
            options: [
                "She was the youngest Nobel laureate.",
                "She discovered gravity.",
                "She won Nobel Prizes in both Physics and Chemistry.",
                "She refused to accept the award.",
            ],
            correctAnswer:
                "She won Nobel Prizes in both Physics and Chemistry.",
            pembahasan:
                "Jawaban C benar karena disebutkan bahwa Marie Curie satu-satunya orang yang memenangkan Nobel di dua bidang sains berbeda.",
        },
        {
            id: 8,
            passage:
                "Coral reefs are diverse underwater ecosystems held together by calcium carbonate structures secreted by corals. These reefs support a vast variety of marine life and are often referred to as the rainforests of the sea.",
            question: "Why are coral reefs often compared to rainforests?",
            options: [
                "Because they are located near rainforests",
                "Due to their similar climate",
                "Because of their biodiversity",
                "Because they produce rainfall",
            ],
            correctAnswer: "Because of their biodiversity",
            pembahasan:
                "Jawaban C benar karena teks menyatakan bahwa terumbu karang mendukung beragam kehidupan laut, mirip dengan hutan hujan di darat.",
        },
        {
            id: 9,
            passage:
                "The invention of the printing press by Johannes Gutenberg in the 15th century revolutionized the spread of information. It allowed for mass production of books and increased literacy rates across Europe.",
            question: "What was one major effect of the printing press?",
            options: [
                "A decrease in education",
                "A reduction in book availability",
                "An increase in oral storytelling",
                "An increase in literacy rates",
            ],
            correctAnswer: "An increase in literacy rates",
            pembahasan:
                "Jawaban D benar karena teks menyebutkan bahwa pencetakan massal buku meningkatkan tingkat melek huruf di Eropa.",
        },
        {
            id: 10,
            passage:
                "The Amazon Rainforest, often called the 'lungs of the Earth,' produces about 20% of the world's oxygen. It is home to millions of species and plays a crucial role in regulating the global climate.",
            question:
                "Why is the Amazon Rainforest called the 'lungs of the Earth'?",
            options: [
                "It filters toxins from rivers.",
                "It produces a significant portion of the Earth's oxygen.",
                "It is shaped like lungs.",
                "It breathes like a living organism.",
            ],
            correctAnswer:
                "It produces a significant portion of the Earth's oxygen.",
            pembahasan:
                "Jawaban B benar karena teks menyatakan bahwa Amazon menghasilkan sekitar 20% dari oksigen dunia.",
        },
        {
            id: 11,
            passage:
                "The Eiffel Tower was originally built as a temporary structure for the 1889 World's Fair in Paris. Designed by Gustave Eiffel, it was initially criticized but is now one of the most recognizable landmarks in the world.",
            question: "Why was the Eiffel Tower originally constructed?",
            options: [
                "As a permanent monument",
                "For the 1889 World's Fair",
                "To serve as a military tower",
                "As Gustave Eiffel's residence",
            ],
            correctAnswer: "For the 1889 World's Fair",
            pembahasan:
                "Jawaban B benar karena teks menyebutkan bahwa menara ini dibangun untuk Pameran Dunia tahun 1889.",
        },
        {
            id: 12,
            passage:
                "Whales are mammals, not fish, because they breathe air through lungs, give live birth, and nurse their young. Despite living in water, their biology aligns more closely with land-dwelling mammals.",
            question:
                "Which of the following supports the idea that whales are mammals?",
            options: [
                "They lay eggs.",
                "They breathe through gills.",
                "They nurse their young and breathe air.",
                "They have scales like fish.",
            ],
            correctAnswer: "They nurse their young and breathe air.",
            pembahasan:
                "Jawaban C benar karena disebutkan bahwa paus menyusui anaknya dan bernapas dengan paru-paru, bukan insang.",
        },
        {
            id: 13,
            passage:
                "The Industrial Revolution began in Britain in the late 18th century and marked a major turning point in history. It led to the mechanization of agriculture, textile manufacturing, and changes in transportation.",
            question: "What was one result of the Industrial Revolution?",
            options: [
                "Decline in technology",
                "End of trade routes",
                "Mechanization of agriculture",
                "Global peace agreements",
            ],
            correctAnswer: "Mechanization of agriculture",
            pembahasan:
                "Jawaban C benar karena teks menyatakan bahwa revolusi industri mengubah cara bertani menjadi mekanis.",
        },
        {
            id: 14,
            passage:
                "Lightning is a natural electrical discharge that occurs during storms. It is caused by the build-up of electrical charges in clouds, which are then released to the ground or between clouds.",
            question: "What causes lightning?",
            options: [
                "The movement of warm air",
                "The build-up and release of electrical charges",
                "Heavy rainfall and thunder",
                "Sudden drop in temperature",
            ],
            correctAnswer: "The build-up and release of electrical charges",
            pembahasan:
                "Jawaban B benar karena teks menjelaskan bahwa kilat terjadi akibat penumpukan dan pelepasan muatan listrik.",
        },
        {
            id: 15,
            passage:
                "The Mona Lisa, painted by Leonardo da Vinci, is one of the most famous works of art in the world. It is renowned for the subject's enigmatic expression and the artist's use of sfumato, a technique for softening transitions between colors.",
            question:
                "What painting technique did da Vinci use in the Mona Lisa?",
            options: ["Fresco", "Impasto", "Sfumato", "Cubism"],
            correctAnswer: "Sfumato",
            pembahasan:
                "Jawaban C benar karena teks menyebutkan bahwa Leonardo menggunakan teknik sfumato dalam lukisan Mona Lisa.",
        },
        {
            id: 16,
            passage:
                "Antarctica is the coldest continent on Earth, with temperatures dropping below -80°C. It is covered by ice sheets that contain about 70% of the world's freshwater. No permanent human residents live there.",
            question:
                "What is one fact about Antarctica mentioned in the passage?",
            options: [
                "It is a tropical island.",
                "It has large cities and towns.",
                "It contains most of the world's freshwater in ice.",
                "It is inhabited by many indigenous tribes.",
            ],
            correctAnswer: "It contains most of the world's freshwater in ice.",
            pembahasan:
                "Jawaban C benar karena disebutkan bahwa lapisan es di Antartika menyimpan sekitar 70% air tawar dunia.",
        },
        {
            id: 17,
            passage:
                "The piano is a musical instrument that uses hammers to strike strings inside its body when keys are pressed. It was invented in the early 18th century and has become a central instrument in Western music.",
            question: "How does a piano produce sound?",
            options: [
                "By blowing air through pipes",
                "By plucking strings with a pick",
                "By striking strings with hammers",
                "By vibrating metal bars",
            ],
            correctAnswer: "By striking strings with hammers",
            pembahasan:
                "Jawaban C benar karena piano menghasilkan suara saat palu memukul senar di dalam tubuhnya.",
        },
        {
            id: 18,
            passage:
                "Nelson Mandela was a South African anti-apartheid revolutionary who became the country's first black president. He is celebrated globally for his role in promoting peace, reconciliation, and equality.",
            question: "What is Nelson Mandela best known for?",
            options: [
                "Discovering new lands",
                "Leading a military revolution",
                "Ending apartheid and promoting equality",
                "Writing science fiction novels",
            ],
            correctAnswer: "Ending apartheid and promoting equality",
            pembahasan:
                "Jawaban C benar karena Mandela terkenal karena perannya dalam mengakhiri apartheid dan mendorong kesetaraan di Afrika Selatan.",
        },
        {
            id: 19,
            passage:
                "Earthquakes occur when energy stored in Earth's crust is suddenly released, causing the ground to shake. These events often happen near fault lines, where tectonic plates meet.",
            question: "Where do earthquakes most commonly occur?",
            options: [
                "In the middle of tectonic plates",
                "Near volcanoes only",
                "Where tectonic plates meet",
                "In the ocean trenches",
            ],
            correctAnswer: "Where tectonic plates meet",
            pembahasan:
                "Jawaban C benar karena teks menyebutkan bahwa gempa bumi biasanya terjadi di dekat patahan tempat lempeng tektonik bertemu.",
        },
        {
            id: 20,
            passage:
                "A haiku is a traditional form of Japanese poetry consisting of three lines. The typical structure includes 5 syllables in the first line, 7 in the second, and 5 in the third, often focusing on nature or seasonal themes.",
            question: "How many syllables are in a traditional haiku?",
            options: ["3-5-3", "7-5-7", "5-7-5", "6-6-6"],
            correctAnswer: "5-7-5",
            pembahasan:
                "Jawaban C benar karena struktur haiku klasik terdiri dari tiga baris dengan 5, 7, dan 5 suku kata secara berurutan.",
        },
        {
            id: 21,
            passage:
                "Thomas Edison is credited with inventing the first practical electric light bulb. His invention made lighting safer and more affordable, and it had a tremendous impact on modern life and industry.",
            question: "What was the major impact of Edison's invention?",
            options: [
                "It created the first power plants.",
                "It made lighting safer and more affordable.",
                "It replaced gas stoves.",
                "It improved communication systems.",
            ],
            correctAnswer: "It made lighting safer and more affordable.",
            pembahasan:
                "Jawaban B benar karena teks menyatakan bahwa bohlam listrik Edison menjadikan penerangan lebih aman dan terjangkau.",
        },
        {
            id: 22,
            passage:
                "Mitosis is the process by which a cell divides to form two identical daughter cells. This process is essential for growth, repair, and asexual reproduction in multicellular organisms.",
            question: "What is the purpose of mitosis?",
            options: [
                "To reduce the number of chromosomes",
                "To create genetic diversity",
                "To form two identical daughter cells",
                "To exchange genetic material",
            ],
            correctAnswer: "To form two identical daughter cells",
            pembahasan:
                "Jawaban C benar karena mitosis menghasilkan dua sel anak yang identik dengan sel induknya.",
        },
        {
            id: 23,
            passage:
                "Shakespeare's plays are still widely read and performed because of their timeless themes and complex characters. His works have had a profound influence on literature and the English language.",
            question: "Why are Shakespeare's plays still relevant today?",
            options: [
                "They were written recently.",
                "They contain complex characters and universal themes.",
                "They are short and easy to understand.",
                "They describe modern inventions.",
            ],
            correctAnswer:
                "They contain complex characters and universal themes.",
            pembahasan:
                "Jawaban B benar karena teks menyebutkan bahwa drama Shakespeare relevan karena tema dan karakternya yang kompleks dan abadi.",
        },
        {
            id: 24,
            passage:
                "The water cycle includes processes like evaporation, condensation, precipitation, and collection. It is driven by the sun's heat and is crucial for distributing water across the planet.",
            question: "What drives the water cycle?",
            options: [
                "Wind",
                "The moon's gravity",
                "Earthquakes",
                "The sun's heat",
            ],
            correctAnswer: "The sun's heat",
            pembahasan:
                "Jawaban D benar karena teks menyebutkan bahwa siklus air digerakkan oleh panas dari matahari.",
        },
        {
            id: 25,
            passage:
                "Benjamin Franklin was a founding father of the United States, known for his experiments with electricity, his writings, and his diplomatic service. He helped draft the Declaration of Independence.",
            question: "What was one of Franklin's contributions to the U.S.?",
            options: [
                "He wrote the Constitution by himself.",
                "He led the Civil War.",
                "He helped draft the Declaration of Independence.",
                "He was the first president.",
            ],
            correctAnswer: "He helped draft the Declaration of Independence.",
            pembahasan:
                "Jawaban C benar karena disebutkan bahwa Franklin berperan dalam merancang Deklarasi Kemerdekaan.",
        },
        {
            id: 26,
            passage:
                "Renewable energy comes from sources that are naturally replenished, such as sunlight, wind, and water. Unlike fossil fuels, these sources are sustainable and less harmful to the environment.",
            question: "Which of the following is a renewable energy source?",
            options: ["Coal", "Natural gas", "Wind", "Petroleum"],
            correctAnswer: "Wind",
            pembahasan:
                "Jawaban C benar karena angin merupakan sumber energi yang dapat diperbarui dan tidak habis.",
        },
        {
            id: 27,
            passage:
                "Shakespeare is considered one of the greatest writers in the English language. He wrote tragedies, comedies, and histories, including famous plays like Hamlet, Macbeth, and Romeo and Juliet.",
            question:
                "Which of the following is a play written by Shakespeare?",
            options: [
                "The Odyssey",
                "Hamlet",
                "Pride and Prejudice",
                "The Great Gatsby",
            ],
            correctAnswer: "Hamlet",
            pembahasan:
                "Jawaban B benar karena Hamlet adalah salah satu drama terkenal karya William Shakespeare.",
        },
        {
            id: 28,
            passage:
                "The water cycle involves the continuous movement of water on, above, and below the surface of the Earth. The main stages are evaporation, condensation, precipitation, and collection.",
            question:
                "What is the correct order of the stages in the water cycle?",
            options: [
                "Condensation → Evaporation → Collection → Precipitation",
                "Evaporation → Condensation → Precipitation → Collection",
                "Collection → Precipitation → Evaporation → Condensation",
                "Evaporation → Precipitation → Condensation → Collection",
            ],
            correctAnswer:
                "Evaporation → Condensation → Precipitation → Collection",
            pembahasan:
                "Jawaban B benar karena siklus air dimulai dengan penguapan, lalu kondensasi, presipitasi, dan pengumpulan.",
        },
        {
            id: 29,
            passage:
                "The internet is a global network that connects millions of computers. It enables users to share information, communicate, and access services around the world instantly.",
            question: "What is one main benefit of the internet?",
            options: [
                "Slower communication",
                "Limited access to information",
                "Instant global communication",
                "More paper usage",
            ],
            correctAnswer: "Instant global communication",
            pembahasan:
                "Jawaban C benar karena internet memungkinkan komunikasi global secara instan dan efisien.",
        },
        {
            id: 30,
            passage:
                "Isaac Newton formulated the laws of motion and universal gravitation in the 17th century. His work laid the foundation for classical mechanics and significantly advanced our understanding of physics.",
            question: "What was Isaac Newton known for?",
            options: [
                "Inventing electricity",
                "Formulating the laws of motion and gravity",
                "Designing airplanes",
                "Discovering nuclear energy",
            ],
            correctAnswer: "Formulating the laws of motion and gravity",
            pembahasan:
                "Jawaban B benar karena Newton terkenal dengan hukum gerak dan gravitasi yang menjadi dasar fisika klasik.",
        },
        {
            id: 31,
            passage:
                "The process of mitosis allows cells to divide and reproduce. It results in two identical daughter cells, each with the same number of chromosomes as the parent cell. Mitosis is essential for growth and tissue repair.",
            question: "What is the main purpose of mitosis?",
            options: [
                "To create different types of cells",
                "To reduce the number of chromosomes",
                "To produce identical cells for growth and repair",
                "To generate reproductive cells",
            ],
            correctAnswer: "To produce identical cells for growth and repair",
            pembahasan:
                "Jawaban C benar karena mitosis menghasilkan dua sel anak identik dan penting untuk pertumbuhan serta perbaikan jaringan.",
        },
        {
            id: 32,
            passage:
                "The Panama Canal is a man-made waterway that connects the Atlantic and Pacific Oceans. It significantly reduces travel time for ships, avoiding the long route around South America.",
            question: "Why is the Panama Canal important for ships?",
            options: [
                "It connects Europe and Asia directly.",
                "It allows ships to avoid traveling around Africa.",
                "It shortens the route between the Atlantic and Pacific Oceans.",
                "It is the only place where ships can dock in South America.",
            ],
            correctAnswer:
                "It shortens the route between the Atlantic and Pacific Oceans.",
            pembahasan:
                "Jawaban C benar karena terusan ini memungkinkan kapal mempersingkat perjalanan antara Samudra Atlantik dan Pasifik.",
        },
        {
            id: 33,
            passage:
                "Benjamin Franklin was an inventor, writer, and statesman. He is well known for his experiments with electricity and for helping draft the United States Declaration of Independence.",
            question: "What is one contribution Benjamin Franklin made?",
            options: [
                "He discovered America.",
                "He led the Civil War.",
                "He helped draft the Declaration of Independence.",
                "He was the first U.S. president.",
            ],
            correctAnswer: "He helped draft the Declaration of Independence.",
            pembahasan:
                "Jawaban C benar karena Benjamin Franklin berperan penting dalam penyusunan Deklarasi Kemerdekaan Amerika.",
        },
        {
            id: 34,
            passage:
                "Fossils are the preserved remains or impressions of ancient organisms. They provide scientists with evidence about life in the past, including extinct species and how environments have changed.",
            question: "What is the significance of fossils?",
            options: [
                "They are used as fuel sources.",
                "They help scientists study past life and environments.",
                "They are modern forms of insects.",
                "They provide food for certain animals.",
            ],
            correctAnswer:
                "They help scientists study past life and environments.",
            pembahasan:
                "Jawaban B benar karena fosil membantu ilmuwan memahami kehidupan dan lingkungan masa lalu.",
        },
        {
            id: 35,
            passage:
                "Venus is often called Earth's sister planet due to its similar size and composition. However, its surface temperature is extremely hot due to a thick atmosphere of carbon dioxide that traps heat.",
            question: "Why is Venus so hot?",
            options: [
                "It is closer to the sun than Mercury.",
                "Its atmosphere traps heat due to high carbon dioxide levels.",
                "It reflects all solar radiation.",
                "It has active volcanoes everywhere.",
            ],
            correctAnswer:
                "Its atmosphere traps heat due to high carbon dioxide levels.",
            pembahasan:
                "Jawaban B benar karena suhu tinggi Venus disebabkan oleh efek rumah kaca dari atmosfer CO₂ yang tebal.",
        },
        {
            id: 36,
            passage:
                "The Boston Tea Party was a political protest in 1773 in which American colonists, frustrated by British taxation, dumped tea into Boston Harbor. It was a significant event leading to the American Revolution.",
            question: "What was the Boston Tea Party a protest against?",
            options: [
                "High land rents",
                "British taxation policies",
                "Military drafting",
                "The tea shortage in England",
            ],
            correctAnswer: "British taxation policies",
            pembahasan:
                "Jawaban B benar karena peristiwa ini merupakan protes terhadap pajak yang diberlakukan Inggris atas teh.",
        },
        {
            id: 37,
            passage:
                "Oxygen is essential for cellular respiration in humans and many other organisms. It allows cells to release energy from food. Without oxygen, most cells cannot survive.",
            question: "Why is oxygen important to human cells?",
            options: [
                "It helps in digestion.",
                "It cools down the body.",
                "It allows cells to release energy from food.",
                "It strengthens muscles directly.",
            ],
            correctAnswer: "It allows cells to release energy from food.",
            pembahasan:
                "Jawaban C benar karena oksigen dibutuhkan untuk respirasi sel, yaitu proses pelepasan energi dari makanan.",
        },
        {
            id: 38,
            passage:
                "A biography is a detailed description of a person's life written by someone else. It includes factual information as well as the subject's achievements, struggles, and impact on others.",
            question: "What distinguishes a biography from an autobiography?",
            options: [
                "It focuses only on childhood.",
                "It is always fictional.",
                "It is written by someone other than the subject.",
                "It contains no factual information.",
            ],
            correctAnswer: "It is written by someone other than the subject.",
            pembahasan:
                "Jawaban C benar karena biografi ditulis oleh orang lain, sedangkan autobiografi ditulis oleh subjek itu sendiri.",
        },
        {
            id: 39,
            passage:
                "Jane Austen was an English novelist known for her keen social commentary and use of irony. Her most famous works include 'Pride and Prejudice' and 'Sense and Sensibility.'",
            question: "What is Jane Austen best known for?",
            options: [
                "Writing historical textbooks",
                "Composing classical music",
                "Writing novels with social commentary",
                "Inventing the printing press",
            ],
            correctAnswer: "Writing novels with social commentary",
            pembahasan:
                "Jawaban C benar karena Austen dikenal atas kritik sosial yang tajam melalui karya sastranya.",
        },
        {
            id: 40,
            passage:
                "Recycling helps reduce waste and conserve natural resources. By reusing materials like paper, plastic, and metal, we can decrease pollution and energy consumption.",
            question: "Which of the following is a benefit of recycling?",
            options: [
                "Increasing landfill use",
                "Raising production costs",
                "Reducing energy use and pollution",
                "Eliminating the need for electricity",
            ],
            correctAnswer: "Reducing energy use and pollution",
            pembahasan:
                "Jawaban C benar karena teks menyatakan bahwa daur ulang membantu mengurangi konsumsi energi dan polusi.",
        },
    ],
};
