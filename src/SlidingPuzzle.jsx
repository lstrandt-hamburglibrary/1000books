import React, { useState, useEffect } from 'react';

const SlidingPuzzle = () => {
  const [gridSize, setGridSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const difficulties = {
    easy: { size: 3, label: 'Easy (3x3)' },
    medium: { size: 4, label: 'Medium (4x4)' },
    hard: { size: 5, label: 'Hard (5x5)' }
  };

  // Initialize puzzle
  const initializePuzzle = (size) => {
    const totalTiles = size * size;
    const numbers = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    numbers.push(null); // Empty tile
    return numbers;
  };

  // Shuffle tiles (ensuring solvability)
  const shuffleTiles = (size) => {
    const solution = initializePuzzle(size);
    const shuffled = [...solution];

    // Perform valid moves to shuffle (ensures solvability)
    const moveCount = size === 3 ? 50 : size === 4 ? 80 : 120;
    let emptyIndex = shuffled.length - 1;

    for (let i = 0; i < moveCount; i++) {
      const validMoves = getValidMoves(emptyIndex, size);
      if (validMoves.length > 0) {
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
        emptyIndex = randomMove;
      }
    }

    return shuffled;
  };

  // Get valid moves for empty tile
  const getValidMoves = (emptyIndex, size) => {
    const moves = [];
    const row = Math.floor(emptyIndex / size);
    const col = emptyIndex % size;

    // Up
    if (row > 0) moves.push(emptyIndex - size);
    // Down
    if (row < size - 1) moves.push(emptyIndex + size);
    // Left
    if (col > 0) moves.push(emptyIndex - 1);
    // Right
    if (col < size - 1) moves.push(emptyIndex + 1);

    return moves;
  };

  // Handle tile click
  const handleTileClick = (index) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(null);
    const validMoves = getValidMoves(emptyIndex, gridSize);

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);

      // Check if puzzle is complete
      checkCompletion(newTiles);
    }
  };

  // Check if puzzle is solved
  const checkCompletion = (currentTiles) => {
    const solved = currentTiles.every((tile, index) => {
      if (index === currentTiles.length - 1) return tile === null;
      return tile === index + 1;
    });
    setIsComplete(solved);
  };

  // Start new game
  const startNewGame = () => {
    const size = difficulties[difficulty].size;
    setGridSize(size);
    setTiles(shuffleTiles(size));
    setMoves(0);
    setIsComplete(false);
  };

  // Initialize on mount and difficulty change
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Get tile color based on position
  const getTileColor = (value) => {
    if (!value) return 'transparent';
    const hue = (value * 25) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2.5em',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        🧩 Sliding Puzzle
      </h1>

      {/* Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.entries(difficulties).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                background: difficulty === key ? '#667eea' : '#e0e0e0',
                color: difficulty === key ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: difficulty === key ? 'bold' : 'normal'
              }}
            >
              {config.label}
            </button>
          ))}
        </div>

        <button
          onClick={startNewGame}
          style={{
            padding: '10px 25px',
            fontSize: '18px',
            borderRadius: '8px',
            border: 'none',
            background: '#48bb78',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          New Game
        </button>

        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Moves: {moves}
        </div>
      </div>

      {/* Game Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '5px',
        background: 'rgba(255, 255, 255, 0.2)',
        padding: '10px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        maxWidth: '500px',
        width: '100%',
        aspectRatio: '1'
      }}>
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            style={{
              background: tile ? getTileColor(tile) : 'rgba(255, 255, 255, 0.1)',
              border: tile ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${Math.max(20, 40 - gridSize * 3)}px`,
              fontWeight: 'bold',
              color: 'white',
              cursor: tile && !isComplete ? 'pointer' : 'default',
              transition: 'all 0.3s',
              transform: tile ? 'scale(1)' : 'scale(0.9)',
              textShadow: tile ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
              minHeight: '50px'
            }}
            onMouseOver={(e) => {
              if (tile && !isComplete) {
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              if (tile && !isComplete) {
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {tile}
          </div>
        ))}
      </div>

      {/* Win Message */}
      {isComplete && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'rgba(72, 187, 120, 0.95)',
          borderRadius: '15px',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          animation: 'bounce 1s infinite'
        }}>
          🎉 Congratulations! 🎉
          <br />
          Solved in {moves} moves!
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        maxWidth: '500px',
        textAlign: 'center',
        color: '#333'
      }}>
        <strong>How to Play:</strong>
        <br />
        Click on tiles next to the empty space to move them.
        <br />
        Arrange numbers in order from 1 to {gridSize * gridSize - 1}!
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default SlidingPuzzle;