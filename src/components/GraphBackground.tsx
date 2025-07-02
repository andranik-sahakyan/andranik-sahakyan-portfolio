'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Neuron {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mesh: THREE.Mesh;
  coreMesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
  connections: number[];
  layer: number;
  activation: number;
  activationHistory: number[];
  lastFired: number;
  firingThreshold: number;
  type: 'input' | 'hidden' | 'output';
}

interface Synapse {
  from: number;
  to: number;
  signals: THREE.Mesh[];
  line: THREE.Line;
  strength: number;
  lastActivation: number;
}

const GraphBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const synapsesRef = useRef<Synapse[]>([]);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera position
    camera.position.z = 50;

    // Create neural network with layered structure
    const neuronCount = 18;
    const neurons: Neuron[] = [];
    
    // Neuron geometries for realistic appearance
    const coreGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const dendritesGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00aaff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const dendritesMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x004488,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    // Create neurons in organized layers
    for (let i = 0; i < neuronCount; i++) {
      // Determine neuron layer and type
      let layer: number;
      let type: 'input' | 'hidden' | 'output';
      let position: THREE.Vector3;
      
      if (i < 4) {
        // Input layer
        layer = 0;
        type = 'input';
        position = new THREE.Vector3(-35, (i - 1.5) * 15, (Math.random() - 0.5) * 10);
      } else if (i < 14) {
        // Hidden layers
        layer = Math.floor((i - 4) / 5) + 1;
        type = 'hidden';
        const layerIndex = (i - 4) % 5;
        position = new THREE.Vector3(
          -10 + layer * 15,
          (layerIndex - 2) * 12,
          (Math.random() - 0.5) * 15
        );
      } else {
        // Output layer
        layer = 3;
        type = 'output';
        position = new THREE.Vector3(35, (i - 15.5) * 10, (Math.random() - 0.5) * 8);
      }
      
      // Create neuron meshes
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial.clone());
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial.clone());
      const dendritesMesh = new THREE.Mesh(dendritesGeometry, dendritesMaterial.clone());
      
      coreMesh.position.copy(position);
      glowMesh.position.copy(position);
      dendritesMesh.position.copy(position);
      
      scene.add(coreMesh);
      scene.add(glowMesh);
      scene.add(dendritesMesh);

      const neuron: Neuron = {
        id: i,
        position: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        mesh: dendritesMesh,
        coreMesh,
        glowMesh,
        connections: [],
        layer,
        activation: 0,
        activationHistory: new Array(10).fill(0),
        lastFired: 0,
        firingThreshold: 0.7 + Math.random() * 0.3,
        type
      };

      neurons.push(neuron);
    }

    neuronsRef.current = neurons;

    // Create synaptic connections with neural intelligence
    const synapses: Synapse[] = [];
    const synapseMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00aaff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    // Create signal geometry for neural transmission
    const signalGeometry = new THREE.SphereGeometry(0.06, 12, 12);
    const signalMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    // Generate neural network connections with intelligence
    const createNeuralConnections = () => {
      // Clear existing synapses
      synapses.forEach(synapse => {
        scene.remove(synapse.line);
        synapse.signals.forEach((signal: THREE.Mesh) => scene.remove(signal));
      });
      synapses.length = 0;

      // Reset neuron connections
      neurons.forEach(neuron => neuron.connections = []);

      // Create forward connections between layers
      for (let i = 0; i < neurons.length; i++) {
        const fromNeuron = neurons[i];
        
        // Connect to neurons in next layer(s)
        for (let j = 0; j < neurons.length; j++) {
          const toNeuron = neurons[j];
          
          // Create connections based on neural network topology
          let shouldConnect = false;
          
          if (fromNeuron.layer < toNeuron.layer) {
            // Forward connections
            const layerDiff = toNeuron.layer - fromNeuron.layer;
            const distance = fromNeuron.position.distanceTo(toNeuron.position);
            
            if (layerDiff === 1) {
              // Adjacent layers - higher connection probability
              shouldConnect = Math.random() < 0.7;
            } else if (layerDiff === 2) {
              // Skip connections - lower probability
              shouldConnect = Math.random() < 0.3;
            }
            
            // Distance-based connection probability
            if (shouldConnect && distance > 40) {
              shouldConnect = Math.random() < 0.3;
            }
          }
          
          if (shouldConnect) {
            fromNeuron.connections.push(j);

            const points = [fromNeuron.position, toNeuron.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, synapseMaterial.clone());
            scene.add(line);

            // Create neural signals
            const signals: THREE.Mesh[] = [];
            const signalCount = Math.random() < 0.5 ? 1 : 2;
            for (let k = 0; k < signalCount; k++) {
              const signal = new THREE.Mesh(signalGeometry, signalMaterial.clone());
              scene.add(signal);
              signals.push(signal);
            }

            synapses.push({
              from: i,
              to: j,
              signals,
              line,
              strength: 0.5 + Math.random() * 0.5,
              lastActivation: 0
            });
          }
        }
      }

      // Add some recurrent connections for complexity
      for (let i = 0; i < 2; i++) {
        const fromId = Math.floor(Math.random() * neurons.length);
        const toId = Math.floor(Math.random() * neurons.length);
        const fromNeuron = neurons[fromId];
        const toNeuron = neurons[toId];
        
        if (fromId !== toId && fromNeuron.layer >= toNeuron.layer && 
            !fromNeuron.connections.includes(toId)) {
          fromNeuron.connections.push(toId);

          const points = [fromNeuron.position, toNeuron.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, synapseMaterial.clone());
          scene.add(line);

          const signals: THREE.Mesh[] = [];
          const signal = new THREE.Mesh(signalGeometry, signalMaterial.clone());
          scene.add(signal);
          signals.push(signal);

          synapses.push({
            from: fromId,
            to: toId,
            signals,
            line,
            strength: 0.3 + Math.random() * 0.4,
            lastActivation: 0
          });
        }
      }
    };

    createNeuralConnections();
    synapsesRef.current = synapses;

         // Neural network animation loop with intelligent behavior
     const animate = () => {
       animationIdRef.current = requestAnimationFrame(animate);
       const time = Date.now() * 0.001;

       // Update neural network behavior
       const updateNeuralNetwork = () => {
         // Generate input activations
         if (Math.random() < 0.1) {
           const inputNeuron = neurons.find(n => n.type === 'input');
           if (inputNeuron) {
             inputNeuron.activation = Math.random();
             inputNeuron.lastFired = time;
           }
         }

         // Propagate signals through the network
         neurons.forEach(neuron => {
           // Update activation history
           neuron.activationHistory.shift();
           neuron.activationHistory.push(neuron.activation);

           // Calculate input from connected neurons
           let totalInput = 0;
           synapses.forEach(synapse => {
             if (synapse.to === neuron.id) {
               const sourceNeuron = neurons[synapse.from];
               if (sourceNeuron.activation > sourceNeuron.firingThreshold) {
                 totalInput += sourceNeuron.activation * synapse.strength;
                 synapse.lastActivation = time;
               }
             }
           });

           // Apply activation function (sigmoid-like)
           if (totalInput > 0) {
             neuron.activation = Math.min(1, neuron.activation + totalInput * 0.1);
           } else {
             neuron.activation *= 0.95; // Decay
           }

           // Fire if threshold exceeded
           if (neuron.activation > neuron.firingThreshold && time - neuron.lastFired > 0.5) {
             neuron.lastFired = time;
             neuron.activation = 1.0;
           }
         });
       };

       updateNeuralNetwork();

       // Animate neurons with neural behavior
       neurons.forEach(neuron => {
         // Subtle position updates
         neuron.position.add(neuron.velocity);
         
         // Gentle boundary constraints
         const bounds = { x: 50, y: 30, z: 15 };
         Object.keys(bounds).forEach(axis => {
           const key = axis as keyof typeof bounds;
           if (Math.abs(neuron.position[key]) > bounds[key]) {
             neuron.velocity[key] *= -0.7;
             neuron.position[key] = Math.sign(neuron.position[key]) * bounds[key];
           }
         });

         // Update all neuron meshes
         neuron.coreMesh.position.copy(neuron.position);
         neuron.glowMesh.position.copy(neuron.position);
         neuron.mesh.position.copy(neuron.position);

         // Neural activation visualization
         const activation = neuron.activation;
         const firingIntensity = Math.max(0, activation - neuron.firingThreshold);

         // Core brightness based on activation
         const coreOpacity = 0.3 + activation * 0.7;
         (neuron.coreMesh.material as THREE.MeshBasicMaterial).opacity = coreOpacity;

         // Glow effect based on firing
         const glowScale = 1 + firingIntensity * 2;
         const glowOpacity = 0.1 + firingIntensity * 0.4;
         neuron.glowMesh.scale.setScalar(glowScale);
         (neuron.glowMesh.material as THREE.MeshBasicMaterial).opacity = glowOpacity;

         // Dendrites pulsing
         const dendriteScale = 0.8 + 0.3 * Math.sin(time * 2 + neuron.id) + activation * 0.2;
         neuron.mesh.scale.setScalar(dendriteScale);

         // Color coding by neuron type and activation
         let baseHue = 0.6; // Blue
         if (neuron.type === 'input') baseHue = 0.3; // Green
         else if (neuron.type === 'output') baseHue = 0.0; // Red

         const hue = baseHue + activation * 0.1;
         const saturation = 0.7 + activation * 0.3;
         const lightness = 0.4 + activation * 0.4;

         (neuron.glowMesh.material as THREE.MeshBasicMaterial).color.setHSL(hue, saturation, lightness);
         (neuron.coreMesh.material as THREE.MeshBasicMaterial).color.setHSL(hue, saturation, lightness + 0.2);
       });

       // Animate synaptic transmission
       synapses.forEach(synapse => {
         const fromNeuron = neurons[synapse.from];
         const toNeuron = neurons[synapse.to];

         // Update synapse geometry
         const points = [fromNeuron.position, toNeuron.position];
         synapse.line.geometry.setFromPoints(points);

         // Calculate synapse activity
         const timeSinceActivation = time - synapse.lastActivation;
         const isActive = timeSinceActivation < 1.0;
         
         // Synapse opacity based on strength and recent activity
         let opacity = synapse.strength * 0.1;
         if (isActive) {
           opacity += 0.3 * Math.exp(-timeSinceActivation * 2);
         }
         (synapse.line.material as THREE.LineBasicMaterial).opacity = opacity;

         // Signal animation along synapses
         const direction = toNeuron.position.clone().sub(fromNeuron.position);
         const distance = direction.length();
         direction.normalize();

         synapse.signals.forEach((signal, index) => {
           if (isActive && timeSinceActivation < 0.8) {
             // Show signal during transmission
             const progress = Math.min(1, timeSinceActivation * 2 + index * 0.2);
             const position = fromNeuron.position.clone().add(
               direction.clone().multiplyScalar(distance * progress)
             );
             signal.position.copy(position);

             const signalOpacity = (1 - progress) * 0.8;
             (signal.material as THREE.MeshBasicMaterial).opacity = signalOpacity;
             signal.visible = true;
           } else {
             signal.visible = false;
           }
         });

         // Synapse color based on activity
         const activityHue = 0.6 + synapse.strength * 0.2;
         (synapse.line.material as THREE.LineBasicMaterial).color.setHSL(activityHue, 0.8, 0.6);
       });

       // Enhanced camera movement
       const cameraTime = Date.now() * 0.0002;
       camera.position.x = 4 * Math.sin(cameraTime * 0.6) + 2 * Math.sin(cameraTime * 1.8);
       camera.position.y = 3 * Math.cos(cameraTime * 0.4) + 1 * Math.cos(cameraTime * 1.2);
       camera.position.z = 55 + 5 * Math.sin(cameraTime * 0.3);
       
       const lookTarget = new THREE.Vector3(
         1 * Math.sin(cameraTime * 0.5),
         0.5 * Math.cos(cameraTime * 0.7),
         0
       );
       camera.lookAt(lookTarget);

       renderer.render(scene, camera);
     };

    animate();

         // Recreate neural network periodically for evolution
     const intervalId = setInterval(createNeuralConnections, 15000);

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const currentMount = mountRef.current;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            (object.material as THREE.Material).dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,212,255,0.03) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 30% 70%, rgba(138,43,226,0.02) 0%, transparent 50%),
          radial-gradient(ellipse 40% 60% at 70% 40%, rgba(0,255,255,0.02) 0%, transparent 40%),
          linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,20,40,0.05) 50%, rgba(0,0,0,0.1) 100%)
        `,
        filter: 'blur(0.5px)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default GraphBackground; 