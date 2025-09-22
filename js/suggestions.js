// Book Suggestions System

const bookSuggestions = {
    animals: {
        title: '🐶 Animal Books',
        books: [
            { title: 'The Very Hungry Caterpillar', author: 'Eric Carle' },
            { title: 'Brown Bear, Brown Bear, What Do You See?', author: 'Bill Martin Jr.' },
            { title: 'Clifford the Big Red Dog', author: 'Norman Bridwell' },
            { title: 'If You Give a Mouse a Cookie', author: 'Laura Numeroff' },
            { title: 'The Rainbow Fish', author: 'Marcus Pfister' },
            { title: 'Giraffes Can\'t Dance', author: 'Giles Andreae' },
            { title: 'Dear Zoo', author: 'Rod Campbell' },
            { title: 'The Gruffalo', author: 'Julia Donaldson' },
            { title: 'Pete the Cat: I Love My White Shoes', author: 'Eric Litwin' },
            { title: 'Stellaluna', author: 'Janell Cannon' }
        ]
    },
    bedtime: {
        title: '😴 Bedtime Stories',
        books: [
            { title: 'Goodnight Moon', author: 'Margaret Wise Brown' },
            { title: 'The Going to Bed Book', author: 'Sandra Boynton' },
            { title: 'Guess How Much I Love You', author: 'Sam McBratney' },
            { title: 'The Napping House', author: 'Audrey Wood' },
            { title: 'Time for Bed', author: 'Mem Fox' },
            { title: 'Pajama Time!', author: 'Sandra Boynton' },
            { title: 'The Rabbit Listened', author: 'Cori Doerrfeld' },
            { title: 'Dream Animals', author: 'Emily Winfield Martin' },
            { title: 'I Love You to the Moon and Back', author: 'Amelia Hepworth' },
            { title: 'The Kissing Hand', author: 'Audrey Penn' }
        ]
    },
    adventure: {
        title: '🗺️ Adventure Stories',
        books: [
            { title: 'Where the Wild Things Are', author: 'Maurice Sendak' },
            { title: 'We\'re Going on a Bear Hunt', author: 'Michael Rosen' },
            { title: 'The Adventures of Beekle', author: 'Dan Santat' },
            { title: 'Harold and the Purple Crayon', author: 'Crockett Johnson' },
            { title: 'Not a Box', author: 'Antoinette Portis' },
            { title: 'Journey', author: 'Aaron Becker' },
            { title: 'The Curious Garden', author: 'Peter Brown' },
            { title: 'Roxaboxen', author: 'Alice McLerran' },
            { title: 'The Polar Express', author: 'Chris Van Allsburg' },
            { title: 'Oh, the Places You\'ll Go!', author: 'Dr. Seuss' }
        ]
    },
    feelings: {
        title: '❤️ Feelings & Emotions',
        books: [
            { title: 'The Way I Feel', author: 'Janan Cain' },
            { title: 'In My Heart', author: 'Jo Witek' },
            { title: 'The Feelings Book', author: 'Todd Parr' },
            { title: 'When Sophie Gets Angry', author: 'Molly Bang' },
            { title: 'The Invisible String', author: 'Patrice Karst' },
            { title: 'My Many Colored Days', author: 'Dr. Seuss' },
            { title: 'Glad Monster, Sad Monster', author: 'Ed Emberley' },
            { title: 'The Color Monster', author: 'Anna Llenas' },
            { title: 'Listening to My Body', author: 'Gabi Garcia' },
            { title: 'The Way I Act', author: 'Steve Metzger' }
        ]
    },
    'abc-123': {
        title: '🔤 ABC & 123 Books',
        books: [
            { title: 'Chicka Chicka Boom Boom', author: 'Bill Martin Jr.' },
            { title: 'The Very Hungry Caterpillar\'s ABC', author: 'Eric Carle' },
            { title: 'Dr. Seuss\'s ABC', author: 'Dr. Seuss' },
            { title: 'LMNO Peas', author: 'Keith Baker' },
            { title: 'Alphabet City', author: 'Stephen T. Johnson' },
            { title: 'One Fish Two Fish Red Fish Blue Fish', author: 'Dr. Seuss' },
            { title: 'Counting Crocodiles', author: 'Judy Sierra' },
            { title: 'Ten Little Ladybugs', author: 'Melanie Gerth' },
            { title: 'Mouse Count', author: 'Ellen Stoll Walsh' },
            { title: '1, 2, 3 to the Zoo', author: 'Eric Carle' }
        ]
    },
    funny: {
        title: '😂 Funny Books',
        books: [
            { title: 'Don\'t Let the Pigeon Drive the Bus!', author: 'Mo Willems' },
            { title: 'Dragons Love Tacos', author: 'Adam Rubin' },
            { title: 'The Book with No Pictures', author: 'B.J. Novak' },
            { title: 'There\'s a Monster in Your Book', author: 'Tom Fletcher' },
            { title: 'I Want My Hat Back', author: 'Jon Klassen' },
            { title: 'The Day the Crayons Quit', author: 'Drew Daywalt' },
            { title: 'Interrupting Chicken', author: 'David Ezra Stein' },
            { title: 'Click, Clack, Moo: Cows That Type', author: 'Doreen Cronin' },
            { title: 'Never Touch a Dragon', author: 'Rosie Greening' },
            { title: 'The Wonky Donkey', author: 'Craig Smith' }
        ]
    },
    classics: {
        title: '📖 Classic Tales',
        books: [
            { title: 'The Very Hungry Caterpillar', author: 'Eric Carle' },
            { title: 'Corduroy', author: 'Don Freeman' },
            { title: 'The Little Engine That Could', author: 'Watty Piper' },
            { title: 'Curious George', author: 'H.A. Rey' },
            { title: 'Make Way for Ducklings', author: 'Robert McCloskey' },
            { title: 'The Tale of Peter Rabbit', author: 'Beatrix Potter' },
            { title: 'The Snowy Day', author: 'Ezra Jack Keats' },
            { title: 'Madeline', author: 'Ludwig Bemelmans' },
            { title: 'The Cat in the Hat', author: 'Dr. Seuss' },
            { title: 'Green Eggs and Ham', author: 'Dr. Seuss' }
        ]
    },
    seasons: {
        title: '🍂 Seasonal Books',
        books: [
            { title: 'The Snowy Day', author: 'Ezra Jack Keats' },
            { title: 'Leaf Man', author: 'Lois Ehlert' },
            { title: 'The Curious Garden', author: 'Peter Brown' },
            { title: 'Snowmen at Night', author: 'Caralyn Buehner' },
            { title: 'Mouse\'s First Spring', author: 'Lauren Thompson' },
            { title: 'Red Leaf, Yellow Leaf', author: 'Lois Ehlert' },
            { title: 'The Umbrella', author: 'Jan Brett' },
            { title: 'Over in the Meadow', author: 'Ezra Jack Keats' },
            { title: 'Bear Snores On', author: 'Karma Wilson' },
            { title: 'The Mitten', author: 'Jan Brett' }
        ]
    }
};

// Show suggestions for selected category
function showSuggestions(category) {
    const suggestionsList = document.getElementById('suggestionsList');
    const categoryData = bookSuggestions[category];

    if (!categoryData) {
        suggestionsList.innerHTML = '<p>No suggestions available for this category.</p>';
        return;
    }

    suggestionsList.innerHTML = `
        <h3>${categoryData.title}</h3>
        <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            ${categoryData.books.map(book => `
                <div style="
                    padding: 1rem;
                    background: var(--bg);
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <div>
                        <div style="font-weight: 600;">${book.title}</div>
                        <div style="color: var(--text-light); font-size: 0.9rem;">by ${book.author}</div>
                    </div>
                    <button onclick="addSuggestedBook('${book.title.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}')" style="
                        padding: 0.5rem 1rem;
                        background: var(--primary);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        white-space: nowrap;
                    ">Add to Library</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Add suggested book to library
function addSuggestedBook(title, author) {
    // Pre-fill the add book form
    document.getElementById('bookTitle').value = title;
    document.getElementById('bookAuthor').value = author;
    document.getElementById('readDate').value = new Date().toISOString().split('T')[0];

    // Switch to add book page
    showPage('add-book');

    // Scroll to top
    window.scrollTo(0, 0);

    showToast('Book details added to form! 📝');
}