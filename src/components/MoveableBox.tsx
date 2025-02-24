// 'use client'
// import { useFrame } from '@react-three/fiber';
// import { useState, useEffect } from 'react';

// const MovableBox = () => {
//   const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       setPosition((prev) => {
//         const [x, y, z] = prev;
//         switch (e.key) {
//           case 'ArrowUp':
//           case 'w':
//             return [x, y, z - 0.2];
//           case 'ArrowDown':
//           case 's':
//             return [x, y, z + 0.2];
//           case 'ArrowLeft':
//           case 'a':
//             return [x - 0.2, y, z];
//           case 'ArrowRight':
//           case 'd':
//             return [x + 0.2, y, z];
//           default:
//             return prev;
//         }
//       });
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   return (
//     <mesh position={position}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   );
// };

// export default MovableBox;
