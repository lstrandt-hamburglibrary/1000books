// Book Suggestions Database - 350 books in 35 categories
const bookSuggestions = {
    abc: {
        name: "ABCs",
        emoji: "🔤",
        books: [
            { title: "A Busy Creature's Day Eating!", author: "Mo Willems", age: "3-6" },
            { title: "Alphabet City", author: "Stephen T. Johnson", age: "3-6" },
            { title: "Alphabet Under Construction", author: "Denise Fleming", age: "3-6" },
            { title: "Animalia", author: "Graeme Base", age: "4-8" },
            { title: "Chicka Chicka Boom Boom", author: "Bill Martin Jr. & John Archambault", age: "2-5" },
            { title: "Dr. Seuss's ABC", author: "Dr. Seuss", age: "2-5" },
            { title: "Eating the Alphabet", author: "Lois Ehlert", age: "2-5" },
            { title: "LMNO Peas", author: "Keith Baker", age: "3-6" },
            { title: "The Alphabet Book", author: "P.D. Eastman", age: "2-5" },
            { title: "Z is for Moose", author: "Kelly Bingham", age: "3-6" }
        ]
    },
    bears: {
        name: "Bears",
        emoji: "🐻",
        books: [
            { title: "Bear Snores On", author: "Karma Wilson", age: "2-5" },
            { title: "Bear Wants More", author: "Karma Wilson", age: "2-5" },
            { title: "Brown Bear, Brown Bear, What Do You See?", author: "Bill Martin Jr. & Eric Carle", age: "0-3" },
            { title: "Corduroy", author: "Don Freeman", age: "3-5" },
            { title: "Goodnight, Little Bear", author: "Richard Scarry", age: "2-5" },
            { title: "Little Bear", author: "Else Holmelund Minarik", age: "3-6" },
            { title: "Old Bear", author: "Kevin Henkes", age: "3-6" },
            { title: "Sleepy Bear", author: "Lydia Dabcovich", age: "2-5" },
            { title: "The Bear's Song", author: "Benjamin Chaud", age: "3-6" },
            { title: "We're Going on a Bear Hunt", author: "Michael Rosen", age: "3-6" }
        ]
    },
    bedtime: {
        name: "Bedtime",
        emoji: "🌙",
        books: [
            { title: "Good Night, Gorilla", author: "Peggy Rathmann", age: "2-5" },
            { title: "Goodnight Moon", author: "Margaret Wise Brown", age: "0-3" },
            { title: "I'm Not Tired Yet!", author: "Marianne Richmond", age: "2-5" },
            { title: "Llama Llama Red Pajama", author: "Anna Dewdney", age: "2-5" },
            { title: "Pajama Time!", author: "Sandra Boynton", age: "0-3" },
            { title: "Sleepyheads", author: "Sandra J. Howatt", age: "2-5" },
            { title: "Ten in the Bed", author: "Penny Dale", age: "2-5" },
            { title: "The Going to Bed Book", author: "Sandra Boynton", age: "0-3" },
            { title: "The Napping House", author: "Audrey Wood", age: "2-5" },
            { title: "Time for Bed", author: "Mem Fox", age: "0-3" }
        ]
    },
    birds: {
        name: "Birds",
        emoji: "🐦",
        books: [
            { title: "A Sick Day for Amos McGee", author: "Philip C. Stead", age: "3-6" },
            { title: "Don't Let the Pigeon Drive the Bus!", author: "Mo Willems", age: "3-6" },
            { title: "Ducks Don't Wear Socks", author: "John Nedwidek", age: "3-6" },
            { title: "Flappy and Scrappy", author: "Arthur Yorinks", age: "3-6" },
            { title: "Have You Seen Birds?", author: "Joanne Oppenheim", age: "3-6" },
            { title: "Hoot Owl, Master of Disguise", author: "Sean Taylor", age: "3-6" },
            { title: "Little Owl's Night", author: "Divya Srinivasan", age: "2-5" },
            { title: "Owl Babies", author: "Martin Waddell", age: "2-5" },
            { title: "Penguin and Pinecone", author: "Salina Yoon", age: "3-6" },
            { title: "The Ugly Duckling", author: "Jerry Pinkney", age: "3-6" }
        ]
    },
    birthdays: {
        name: "Birthdays",
        emoji: "🎂",
        books: [
            { title: "A Birthday for Cow!", author: "Jan Thomas", age: "2-5" },
            { title: "Birthday Monsters!", author: "Sandra Boynton", age: "2-5" },
            { title: "Curious George and the Birthday Surprise", author: "Margaret & H.A. Rey", age: "3-6" },
            { title: "Happy Birthday, Moon", author: "Frank Asch", age: "3-6" },
            { title: "If You Give a Pig a Party", author: "Laura Numeroff", age: "3-6" },
            { title: "Little Blue Truck's Birthday", author: "Alice Schertle", age: "2-5" },
            { title: "Llama Llama Birthday Party", author: "Anna Dewdney", age: "2-5" },
            { title: "Maisy's Birthday", author: "Lucy Cousins", age: "2-5" },
            { title: "Not Your Typical Dragon", author: "Dan Bar-el", age: "3-6" },
            { title: "Spot's Birthday Party", author: "Eric Hill", age: "0-3" }
        ]
    },
    bugs: {
        name: "Bugs",
        emoji: "🐛",
        books: [
            { title: "Bugs! Bugs! Bugs!", author: "Bob Barner", age: "2-5" },
            { title: "Bumblebee, Bumblebee, Do You Know Me?", author: "Anne Rockwell", age: "2-5" },
            { title: "Diary of a Fly", author: "Doreen Cronin", age: "4-7" },
            { title: "Diary of a Spider", author: "Doreen Cronin", age: "4-7" },
            { title: "Diary of a Worm", author: "Doreen Cronin", age: "4-7" },
            { title: "Hey, Little Ant", author: "Phillip & Hannah Hoose", age: "3-6" },
            { title: "I Love Bugs!", author: "Philemon Sturges", age: "2-5" },
            { title: "In the Tall, Tall Grass", author: "Denise Fleming", age: "2-5" },
            { title: "The Grouchy Ladybug", author: "Eric Carle", age: "2-5" },
            { title: "Waiting for Wings", author: "Lois Ehlert", age: "3-6" }
        ]
    },
    bunnies: {
        name: "Bunnies",
        emoji: "🐰",
        books: [
            { title: "Guess How Much I Love You", author: "Sam McBratney", age: "2-5" },
            { title: "Home for a Bunny", author: "Margaret Wise Brown", age: "2-5" },
            { title: "Knuffle Bunny Too", author: "Mo Willems", age: "3-6" },
            { title: "Knuffle Bunny", author: "Mo Willems", age: "2-5" },
            { title: "Little White Rabbit", author: "Kevin Henkes", age: "2-5" },
            { title: "Marshmallow", author: "Clare Turlay Newberry", age: "3-6" },
            { title: "Max and Ruby (series)", author: "Rosemary Wells", age: "2-5" },
            { title: "Pat the Bunny", author: "Dorothy Kunhardt", age: "0-2" },
            { title: "The Runaway Bunny", author: "Margaret Wise Brown", age: "2-5" },
            { title: "The Tale of Peter Rabbit", author: "Beatrix Potter", age: "3-6" }
        ]
    },
    cats: {
        name: "Cat Tales",
        emoji: "🐱",
        books: [
            { title: "Bad Kitty", author: "Nick Bruel", age: "4-7" },
            { title: "Cookie's Week", author: "Cindy Ward", age: "2-5" },
            { title: "Have You Seen My Cat?", author: "Eric Carle", age: "2-5" },
            { title: "Kitten's First Full Moon", author: "Kevin Henkes", age: "2-5" },
            { title: "Mama Cat Has Three Kittens", author: "Denise Fleming", age: "2-5" },
            { title: "Millions of Cats", author: "Wanda Gág", age: "3-6" },
            { title: "Pete the Cat: I Love My White Shoes", author: "James Dean & Eric Litwin", age: "3-6" },
            { title: "Splat the Cat", author: "Rob Scotton", age: "3-6" },
            { title: "There Are Cats in This Book", author: "Viviane Schwarz", age: "3-6" },
            { title: "Top Cat", author: "Lois Ehlert", age: "3-6" }
        ]
    },
    christmas: {
        name: "Christmas",
        emoji: "🎄",
        books: [
            { title: "Bear Stays Up for Christmas", author: "Karma Wilson", age: "2-5" },
            { title: "How the Grinch Stole Christmas!", author: "Dr. Seuss", age: "3-7" },
            { title: "Llama Llama Holiday Drama", author: "Anna Dewdney", age: "2-5" },
            { title: "Merry Christmas, Curious George", author: "Margaret & H.A. Rey", age: "3-6" },
            { title: "Olive, the Other Reindeer", author: "Vivian Walsh", age: "3-6" },
            { title: "Pete the Cat Saves Christmas", author: "James Dean & Eric Litwin", age: "3-6" },
            { title: "Snowmen at Christmas", author: "Caralyn Buehner", age: "3-6" },
            { title: "The Christmas Wish", author: "Lori Evert", age: "4-7" },
            { title: "The Night Before Christmas", author: "Clement C. Moore / Jan Brett", age: "3-7" },
            { title: "The Polar Express", author: "Chris Van Allsburg", age: "3-7" }
        ]
    },
    classics: {
        name: "Classics",
        emoji: "📚",
        books: [
            { title: "Alexander and the Terrible, Horrible, No Good, Very Bad Day", author: "Judith Viorst", age: "4-7" },
            { title: "Caps for Sale", author: "Esphyr Slobodkina", age: "3-6" },
            { title: "Chicka Chicka Boom Boom", author: "Bill Martin Jr. & John Archambault", age: "2-5" },
            { title: "Harold and the Purple Crayon", author: "Crockett Johnson", age: "3-6" },
            { title: "Madeline", author: "Ludwig Bemelmans", age: "3-6" },
            { title: "Make Way for Ducklings", author: "Robert McCloskey", age: "3-6" },
            { title: "Mike Mulligan and His Steam Shovel", author: "Virginia Lee Burton", age: "3-6" },
            { title: "The Snowy Day", author: "Ezra Jack Keats", age: "2-5" },
            { title: "The Very Hungry Caterpillar", author: "Eric Carle", age: "2-5" },
            { title: "Where the Wild Things Are", author: "Maurice Sendak", age: "3-6" }
        ]
    },
    colors: {
        name: "Colors",
        emoji: "🌈",
        books: [
            { title: "A Color of His Own", author: "Leo Lionni", age: "3-6" },
            { title: "Blue Hat, Green Hat", author: "Sandra Boynton", age: "0-3" },
            { title: "Mix It Up!", author: "Hervé Tullet", age: "2-5" },
            { title: "Monsters Love Colors", author: "Mike Austin", age: "3-6" },
            { title: "Mouse Paint", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "My Many Colored Days", author: "Dr. Seuss", age: "3-6" },
            { title: "Planting a Rainbow", author: "Lois Ehlert", age: "2-5" },
            { title: "What Makes a Rainbow?", author: "Betty Ann Schwartz", age: "2-5" },
            { title: "White Rabbit's Color Book", author: "Alan Baker", age: "2-5" },
            { title: "Wow! Said the Owl", author: "Tim Hopgood", age: "2-5" }
        ]
    },
    counting: {
        name: "Counting",
        emoji: "🔢",
        books: [
            { title: "Anno's Counting Book", author: "Mitsumasa Anno", age: "3-6" },
            { title: "Chicka Chicka 1, 2, 3", author: "Bill Martin Jr. & Michael Sampson", age: "2-5" },
            { title: "Fish Eyes", author: "Lois Ehlert", age: "2-5" },
            { title: "Five Little Monkeys Jumping on the Bed", author: "Eileen Christelow", age: "2-5" },
            { title: "How Do Dinosaurs Count to Ten?", author: "Jane Yolen & Mark Teague", age: "2-5" },
            { title: "Mouse Count", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "Over in the Meadow", author: "John Langstaff", age: "2-5" },
            { title: "Pete the Cat and His Four Groovy Buttons", author: "James Dean & Eric Litwin", age: "3-6" },
            { title: "Ten Black Dots", author: "Donald Crews", age: "2-5" },
            { title: "Ten Little Ladybugs", author: "Melanie Gerth", age: "2-5" }
        ]
    },
    dinosaurs: {
        name: "Dinosaurs",
        emoji: "🦕",
        books: [
            { title: "Brontorina", author: "James Howe", age: "3-6" },
            { title: "Danny and the Dinosaur", author: "Syd Hoff", age: "3-6" },
            { title: "Dinosaur Roar!", author: "Paul & Henrietta Stickland", age: "2-5" },
            { title: "Dinosaur vs. Bedtime", author: "Bob Shea", age: "2-5" },
            { title: "Dinosaurs, Dinosaurs", author: "Byron Barton", age: "2-5" },
            { title: "Goldilocks and the Three Dinosaurs", author: "Mo Willems", age: "3-6" },
            { title: "How Do Dinosaurs Say Good Night?", author: "Jane Yolen & Mark Teague", age: "2-5" },
            { title: "If the Dinosaurs Came Back", author: "Bernard Most", age: "3-6" },
            { title: "Saturday Night at the Dinosaur Stomp", author: "Carol Diggory Shields", age: "3-6" },
            { title: "Tiny T. Rex and the Impossible Hug", author: "Jonathan Stutzman", age: "3-6" }
        ]
    },
    dogs: {
        name: "Dogs",
        emoji: "🐕",
        books: [
            { title: "Biscuit (series)", author: "Alyssa Satin Capucilli", age: "1-3" },
            { title: "Can I Be Your Dog?", author: "Troy Cummings", age: "3-6" },
            { title: "Charlie the Ranch Dog", author: "Ree Drummond", age: "3-6" },
            { title: "Clifford the Big Red Dog", author: "Norman Bridwell", age: "2-5" },
            { title: "Dog's Colorful Day", author: "Emma Dodd", age: "2-5" },
            { title: "Go, Dog. Go!", author: "P.D. Eastman", age: "2-5" },
            { title: "Good Dog, Carl", author: "Alexandra Day", age: "2-5" },
            { title: "Harry the Dirty Dog", author: "Gene Zion", age: "3-6" },
            { title: "Sit, Stay, Love", author: "J.J. Austrian", age: "3-6" },
            { title: "The Poky Little Puppy", author: "Janette Sebring Lowrey", age: "2-5" }
        ]
    },
    dragons: {
        name: "Dragon Tales",
        emoji: "🐉",
        books: [
            { title: "Again!", author: "Emily Gravett", age: "2-5" },
            { title: "Dragon Was Terrible", author: "Kelly DiPucchio", age: "3-6" },
            { title: "Dragons Love Tacos", author: "Adam Rubin", age: "3-6" },
            { title: "How to Catch a Dragon", author: "Adam Wallace", age: "3-6" },
            { title: "Me and My Dragon", author: "David Biedrzycki", age: "3-6" },
            { title: "Room on the Broom", author: "Julia Donaldson", age: "3-6" },
            { title: "The Knight and the Dragon", author: "Tomie dePaola", age: "3-6" },
            { title: "The Paper Bag Princess", author: "Robert Munsch", age: "3-6" },
            { title: "There's No Such Thing as a Dragon", author: "Jack Kent", age: "3-6" },
            { title: "When a Dragon Moves In", author: "Jodi Moore", age: "3-6" }
        ]
    },
    fairytales: {
        name: "Fairy Tales",
        emoji: "👑",
        books: [
            { title: "Cinderella", author: "Marcia Brown", age: "3-6" },
            { title: "Goldilocks and the Three Bears", author: "Jan Brett", age: "2-5" },
            { title: "Jack and the Beanstalk", author: "Steven Kellogg", age: "3-6" },
            { title: "Rapunzel", author: "Paul O. Zelinsky", age: "4-7" },
            { title: "Rumpelstiltskin", author: "Paul O. Zelinsky", age: "4-7" },
            { title: "The Gingerbread Man", author: "Jim Aylesworth", age: "2-5" },
            { title: "The Princess and the Pea", author: "Rachel Isadora", age: "3-6" },
            { title: "The Three Billy Goats Gruff", author: "Paul Galdone", age: "2-5" },
            { title: "The Three Little Pigs", author: "James Marshall", age: "2-5" },
            { title: "The True Story of the 3 Little Pigs", author: "Jon Scieszka", age: "3-6" }
        ]
    },
    fall: {
        name: "Fall",
        emoji: "🍂",
        books: [
            { title: "Apples and Pumpkins", author: "Anne Rockwell", age: "2-5" },
            { title: "Fall Mixed Up", author: "Bob Raczka", age: "3-6" },
            { title: "Fletcher and the Falling Leaves", author: "Julia Rawlinson", age: "3-6" },
            { title: "Goodbye Summer, Hello Autumn", author: "Kenard Pak", age: "3-6" },
            { title: "In November", author: "Cynthia Rylant", age: "3-6" },
            { title: "Leaf Man", author: "Lois Ehlert", age: "3-6" },
            { title: "Red Leaf, Yellow Leaf", author: "Lois Ehlert", age: "3-6" },
            { title: "The Scarecrow", author: "Beth Ferry", age: "3-6" },
            { title: "There Was an Old Lady Who Swallowed Some Leaves!", author: "Lucille Colandro", age: "2-5" },
            { title: "We're Going on a Leaf Hunt", author: "Steve Metzger", age: "2-5" }
        ]
    },
    families: {
        name: "Family",
        emoji: "👨‍👩‍👧‍👦",
        books: [
            { title: "A Chair for My Mother", author: "Vera B. Williams", age: "4-7" },
            { title: "Are You My Mother?", author: "P.D. Eastman", age: "2-5" },
            { title: "Everywhere Babies", author: "Susan Meyers", age: "0-3" },
            { title: "Grandpa Green", author: "Lane Smith", age: "4-7" },
            { title: "Julius, the Baby of the World", author: "Kevin Henkes", age: "3-6" },
            { title: "Love You Forever", author: "Robert Munsch", age: "3-6" },
            { title: "Owl Babies", author: "Martin Waddell", age: "2-5" },
            { title: "Spot Loves His Mommy", author: "Eric Hill", age: "0-3" },
            { title: "The Relatives Came", author: "Cynthia Rylant", age: "3-6" },
            { title: "What Mommies Do Best / What Daddies Do Best", author: "Laura Numeroff", age: "2-5" }
        ]
    },
    food: {
        name: "Food",
        emoji: "🍕",
        books: [
            { title: "Cloudy with a Chance of Meatballs", author: "Judi Barrett", age: "4-7" },
            { title: "Eating the Alphabet", author: "Lois Ehlert", age: "2-5" },
            { title: "Everybody Cooks Rice", author: "Norah Dooley", age: "4-7" },
            { title: "If You Give a Moose a Muffin", author: "Laura Numeroff", age: "3-6" },
            { title: "If You Give a Mouse a Cookie", author: "Laura Numeroff", age: "3-6" },
            { title: "If You Give a Pig a Pancake", author: "Laura Numeroff", age: "3-6" },
            { title: "Pancakes, Pancakes!", author: "Eric Carle", age: "3-6" },
            { title: "Stone Soup", author: "Marcia Brown", age: "3-6" },
            { title: "The Very Hungry Caterpillar", author: "Eric Carle", age: "2-5" },
            { title: "Too Many Tamales", author: "Gary Soto", age: "4-7" }
        ]
    },
    halloween: {
        name: "Halloween",
        emoji: "🎃",
        books: [
            { title: "Big Pumpkin", author: "Erica Silverman", age: "3-6" },
            { title: "Click, Clack, Boo!: A Tricky Treat", author: "Doreen Cronin", age: "3-6" },
            { title: "It's Pumpkin Day, Mouse!", author: "Laura Numeroff", age: "3-6" },
            { title: "Pete the Cat: Five Little Pumpkins", author: "James Dean", age: "3-6" },
            { title: "Pumpkin Jack", author: "Will Hubbell", age: "3-6" },
            { title: "Scaredy-Cat, Splat!", author: "Rob Scotton", age: "3-6" },
            { title: "Snowmen at Halloween", author: "Caralyn Buehner", age: "3-6" },
            { title: "Ten Orange Pumpkins", author: "Stephen Savage", age: "2-5" },
            { title: "The Little Old Lady Who Was Not Afraid of Anything", author: "Linda Williams", age: "3-6" },
            { title: "Trick or Treat, Smell My Feet", author: "Diane deGroat", age: "3-6" }
        ]
    },
    knights: {
        name: "Knights & Castles",
        emoji: "⚔️",
        books: [
            { title: "Brave Knights", author: "Kelly Powell", age: "3-6" },
            { title: "Good Night, Good Knight", author: "Shelley Moore Thomas", age: "3-6" },
            { title: "In the Castle", author: "Anna Milbourne", age: "2-5" },
            { title: "King Jack and the Dragon", author: "Peter Bently", age: "3-6" },
            { title: "No Dragons for Tea: Fire Safety", author: "Jean Pendziwol", age: "3-6" },
            { title: "Sir Small and the Dragonfly", author: "Jane O'Connor", age: "3-6" },
            { title: "The Boy Who Cried Dragon", author: "Debbie McQueen", age: "3-6" },
            { title: "The Bravest Knight", author: "Mercer Mayer", age: "3-6" },
            { title: "The Knight Who Said \"No!\"", author: "Lucy Rowland", age: "3-6" },
            { title: "The Sword in the Stone (Disney adaptation)", author: "Disney", age: "3-6" }
        ]
    },
    mice: {
        name: "Mouse Tales",
        emoji: "🐭",
        books: [
            { title: "Chrysanthemum", author: "Kevin Henkes", age: "3-6" },
            { title: "Frederick", author: "Leo Lionni", age: "3-6" },
            { title: "If You Give a Mouse a Cookie", author: "Laura Numeroff", age: "3-6" },
            { title: "Maisy's ABC", author: "Lucy Cousins", age: "0-3" },
            { title: "Mouse Count", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "Mouse Paint", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "Mouse Shapes", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "Seven Blind Mice", author: "Ed Young", age: "3-6" },
            { title: "Sheila Rae, the Brave", author: "Kevin Henkes", age: "3-6" },
            { title: "The Little Mouse, the Red Ripe Strawberry, and the Big Hungry Bear", author: "Don & Audrey Wood", age: "2-5" }
        ]
    },
    monkeys: {
        name: "Monkey Business",
        emoji: "🐵",
        books: [
            { title: "Caps for Sale", author: "Esphyr Slobodkina", age: "3-6" },
            { title: "Curious George and the Hot Air Balloon", author: "H.A. Rey", age: "3-6" },
            { title: "Curious George", author: "H.A. Rey", age: "3-6" },
            { title: "Five Little Monkeys Jumping on the Bed", author: "Eileen Christelow", age: "2-5" },
            { title: "Five Little Monkeys Sitting in a Tree", author: "Eileen Christelow", age: "2-5" },
            { title: "Grumpy Monkey", author: "Suzanne Lang", age: "3-6" },
            { title: "Hand, Hand, Fingers, Thumb", author: "Al Perkins", age: "0-3" },
            { title: "Monkey and Me", author: "Emily Gravett", age: "2-5" },
            { title: "Shoes from Grandpa", author: "Mem Fox", age: "3-6" },
            { title: "Ten Naughty Little Monkeys", author: "Susie Jin", age: "2-5" }
        ]
    },
    ocean: {
        name: "Ocean Adventures",
        emoji: "🌊",
        books: [
            { title: "Big Al", author: "Andrew Clements", age: "3-6" },
            { title: "Clark the Shark", author: "Bruce Hale", age: "3-6" },
            { title: "Commotion in the Ocean", author: "Giles Andreae", age: "2-5" },
            { title: "Flotsam", author: "David Wiesner", age: "4-7" },
            { title: "I'm the Biggest Thing in the Ocean", author: "Kevin Sherry", age: "3-6" },
            { title: "Manfish: A Story of Jacques Cousteau", author: "Jennifer Berne", age: "4-7" },
            { title: "Over in the Ocean: In a Coral Reef", author: "Marianne Berkes", age: "3-6" },
            { title: "Rainbow Fish", author: "Marcus Pfister", age: "3-6" },
            { title: "Swimmy", author: "Leo Lionni", age: "3-6" },
            { title: "Way Down Deep in the Deep Blue Sea", author: "Jan Peck", age: "3-6" }
        ]
    },
    pets: {
        name: "Pets",
        emoji: "🐾",
        books: [
            { title: "A Pet for Petunia", author: "Paul Schmid", age: "3-6" },
            { title: "Can I Keep Him?", author: "Steven Kellogg", age: "3-6" },
            { title: "Children Make Terrible Pets", author: "Peter Brown", age: "3-6" },
            { title: "Gilbert Goldfish Wants a Pet", author: "Kelly DiPucchio", age: "3-6" },
            { title: "I Wanna Iguana", author: "Karen Kaufman Orloff", age: "4-7" },
            { title: "Oh, Theodore! Guinea Pig Poems", author: "Susan Katz", age: "3-6" },
            { title: "Sophie's Fish", author: "A.E. Cannon", age: "3-6" },
            { title: "Strictly No Elephants", author: "Lisa Mantchev", age: "3-6" },
            { title: "The Pigeon Wants a Puppy!", author: "Mo Willems", age: "3-6" },
            { title: "What Pet Should I Get?", author: "Dr. Seuss", age: "3-6" }
        ]
    },
    pirates: {
        name: "Pirate Adventures",
        emoji: "🏴‍☠️",
        books: [
            { title: "Captain Flinn and the Pirate Dinosaurs", author: "Giles Andreae", age: "3-6" },
            { title: "How I Became a Pirate", author: "Melinda Long", age: "3-6" },
            { title: "Pete the Cat and the Treasure Map", author: "James Dean", age: "3-6" },
            { title: "Pirate Girl", author: "Cornelia Funke", age: "3-6" },
            { title: "Pirate Pete", author: "Kim Kennedy", age: "3-6" },
            { title: "Pirates Don't Change Diapers", author: "Melinda Long", age: "3-6" },
            { title: "Port Side Pirates!", author: "Oscar Seaworthy", age: "3-6" },
            { title: "Shiver Me Letters: A Pirate ABC", author: "June Sobel", age: "3-6" },
            { title: "The Pirates Next Door", author: "Jonny Duddle", age: "3-6" },
            { title: "Tough Boris", author: "Mem Fox", age: "3-6" }
        ]
    },
    school: {
        name: "School Days",
        emoji: "🏫",
        books: [
            { title: "Chrysanthemum", author: "Kevin Henkes", age: "3-6" },
            { title: "David Goes to School", author: "David Shannon", age: "3-6" },
            { title: "Froggy Goes to School", author: "Jonathan London", age: "3-6" },
            { title: "If You Ever Want to Bring an Alligator to School, Don't!", author: "Elise Parsley", age: "3-6" },
            { title: "Llama Llama Misses Mama", author: "Anna Dewdney", age: "2-5" },
            { title: "Miss Bindergarten Gets Ready for Kindergarten", author: "Joseph Slate", age: "3-6" },
            { title: "Pete the Cat: Rocking in My School Shoes", author: "James Dean & Eric Litwin", age: "3-6" },
            { title: "School's First Day of School", author: "Adam Rex", age: "3-6" },
            { title: "The Day You Begin", author: "Jacqueline Woodson", age: "4-7" },
            { title: "The Day the Crayons Quit", author: "Drew Daywalt", age: "3-6" }
        ]
    },
    shapes: {
        name: "Shapes",
        emoji: "⭐",
        books: [
            { title: "City Shapes", author: "Diana Murray", age: "2-5" },
            { title: "Color Zoo", author: "Lois Ehlert", age: "2-5" },
            { title: "Mouse Shapes", author: "Ellen Stoll Walsh", age: "2-5" },
            { title: "Perfect Square", author: "Michael Hall", age: "3-6" },
            { title: "Round Is a Tortilla", author: "Roseanne Greenfield Thong", age: "2-5" },
            { title: "Shape by Shape", author: "Suse MacDonald", age: "2-5" },
            { title: "Shapes, Shapes, Shapes", author: "Tana Hoban", age: "2-5" },
            { title: "So Many Circles, So Many Squares", author: "Tana Hoban", age: "2-5" },
            { title: "The Shape of Things", author: "Dayle Ann Dodds", age: "2-5" },
            { title: "When a Line Bends… A Shape Begins", author: "Rhonda Gowler Greene", age: "3-6" }
        ]
    },
    space: {
        name: "Space",
        emoji: "🚀",
        books: [
            { title: "Astro Girl", author: "Ken Wilson-Max", age: "3-6" },
            { title: "Life on Mars", author: "Jon Agee", age: "3-6" },
            { title: "Moon! Earth's Best Friend", author: "Stacy McAnulty", age: "3-6" },
            { title: "Mousetronaut", author: "Mark Kelly", age: "3-6" },
            { title: "On the Launch Pad: A Counting Book About Rockets", author: "Michael Dahl", age: "3-6" },
            { title: "Papa, Please Get the Moon for Me", author: "Eric Carle", age: "2-5" },
            { title: "Roaring Rockets", author: "Tony Mitton", age: "2-5" },
            { title: "The Darkest Dark", author: "Chris Hadfield", age: "4-7" },
            { title: "The Way Back Home", author: "Oliver Jeffers", age: "3-6" },
            { title: "There's No Place Like Space!", author: "Tish Rabe", age: "3-6" }
        ]
    },
    spring: {
        name: "Spring",
        emoji: "🌸",
        books: [
            { title: "And Then It's Spring", author: "Julie Fogliano", age: "3-6" },
            { title: "Bear Wants More", author: "Karma Wilson", age: "2-5" },
            { title: "Mouse's First Spring", author: "Lauren Thompson", age: "0-3" },
            { title: "Muncha! Muncha! Muncha!", author: "Candace Fleming", age: "3-6" },
            { title: "Spring is Here", author: "Will Hillenbrand", age: "2-5" },
            { title: "The Tiny Seed", author: "Eric Carle", age: "3-6" },
            { title: "Waiting for Wings", author: "Lois Ehlert", age: "3-6" },
            { title: "Wake Up, It's Spring!", author: "Lisa Campbell Ernst", age: "2-5" },
            { title: "When Spring Comes", author: "Kevin Henkes", age: "3-6" },
            { title: "Worm Weather", author: "Jean Taft", age: "3-6" }
        ]
    },
    summer: {
        name: "Summer",
        emoji: "☀️",
        books: [
            { title: "A Beach Tail", author: "Karen Lynn Williams", age: "3-6" },
            { title: "Froggy Learns to Swim", author: "Jonathan London", age: "3-6" },
            { title: "How I Spent My Summer Vacation", author: "Mark Teague", age: "4-7" },
            { title: "Jabari Jumps", author: "Gaia Cornwall", age: "3-6" },
            { title: "Maisy Goes Swimming", author: "Lucy Cousins", age: "0-3" },
            { title: "One Hot Summer Day", author: "Nina Crews", age: "2-5" },
            { title: "Pete at the Beach", author: "James Dean", age: "3-6" },
            { title: "Sun Dance, Water Dance", author: "Jonathan London", age: "3-6" },
            { title: "Surfer Chick", author: "Kristy Dempsey", age: "3-6" },
            { title: "The Relatives Came", author: "Cynthia Rylant", age: "3-6" }
        ]
    },
    thanksgiving: {
        name: "Thanksgiving",
        emoji: "🦃",
        books: [
            { title: "A Plump and Perky Turkey", author: "Teresa Bateman", age: "3-6" },
            { title: "Balloons Over Broadway", author: "Melissa Sweet", age: "4-7" },
            { title: "Bear Says Thanks", author: "Karma Wilson", age: "2-5" },
            { title: "I Know an Old Lady Who Swallowed a Pie", author: "Alison Jackson", age: "3-6" },
            { title: "Over the River and Through the Wood", author: "Lydia Maria Child", age: "3-6" },
            { title: "Pete the Cat: The First Thanksgiving", author: "Kimberly & James Dean", age: "3-6" },
            { title: "Thank You, Sarah", author: "Laurie Halse Anderson", age: "4-7" },
            { title: "Thanksgiving is for Giving Thanks", author: "Margaret Sutherland", age: "2-5" },
            { title: "Turkey Trouble", author: "Wendi Silvano", age: "3-6" },
            { title: "Twas the Night Before Thanksgiving", author: "Dav Pilkey", age: "3-6" }
        ]
    },
    thingsgo: {
        name: "Things That Go",
        emoji: "🚗",
        books: [
            { title: "Big Machines: The Story of Virginia Lee Burton", author: "Sherri Duskey Rinker", age: "3-6" },
            { title: "Cars and Trucks and Things That Go", author: "Richard Scarry", age: "2-5" },
            { title: "Chugga-Chugga Choo-Choo", author: "Kevin Lewis", age: "2-5" },
            { title: "Freight Train", author: "Donald Crews", age: "2-4" },
            { title: "Goodnight, Goodnight, Construction Site", author: "Sherri Duskey Rinker", age: "2-5" },
            { title: "I Stink!", author: "Kate & Jim McMullan", age: "3-6" },
            { title: "Little Blue Truck", author: "Alice Schertle", age: "2-5" },
            { title: "Sheep in a Jeep", author: "Nancy Shaw", age: "2-5" },
            { title: "The Wheels on the Bus", author: "Paul O. Zelinsky", age: "0-3" },
            { title: "Truck", author: "Donald Crews", age: "2-5" }
        ]
    },
    toys: {
        name: "Toys",
        emoji: "🧸",
        books: [
            { title: "Corduroy Lost and Found", author: "B.G. Hennessy", age: "3-6" },
            { title: "Dogger", author: "Shirley Hughes", age: "3-6" },
            { title: "I Lost My Bear", author: "Jules Feiffer", age: "3-6" },
            { title: "Knuffle Bunny Free", author: "Mo Willems", age: "3-6" },
            { title: "Lost in the Toy Museum", author: "David Lucas", age: "3-6" },
            { title: "Old Bear", author: "Kevin Henkes", age: "3-6" },
            { title: "Teddy Bears' Picnic", author: "Jimmy Kennedy", age: "2-5" },
            { title: "The Stuffed Animals Get Ready for Bed", author: "Alison Inches", age: "2-5" },
            { title: "The Velveteen Rabbit", author: "Margery Williams", age: "4-7" },
            { title: "Where's My Teddy?", author: "Jez Alborough", age: "2-5" }
        ]
    },
    winter: {
        name: "Winter",
        emoji: "❄️",
        books: [
            { title: "A Loud Winter's Nap", author: "Katy Hudson", age: "3-6" },
            { title: "Katy and the Big Snow", author: "Virginia Lee Burton", age: "3-6" },
            { title: "No Two Alike", author: "Keith Baker", age: "2-5" },
            { title: "Over and Under the Snow", author: "Kate Messner", age: "4-7" },
            { title: "Owl Moon", author: "Jane Yolen", age: "3-7" },
            { title: "Snowflake Bentley", author: "Jacqueline Briggs Martin", age: "5-8" },
            { title: "Tacky the Penguin", author: "Helen Lester", age: "3-6" },
            { title: "The Biggest Snowman Ever", author: "Steven Kroll", age: "3-6" },
            { title: "The Mitten", author: "Jan Brett", age: "3-6" },
            { title: "The Snowy Day", author: "Ezra Jack Keats", age: "2-5" }
        ]
    }
};