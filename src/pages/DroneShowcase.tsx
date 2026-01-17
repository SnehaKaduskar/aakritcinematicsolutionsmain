import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import droneAsset from '../assets/scifi_drone_1.1.glb?url';

type PointerState = { x: number; y: number };

const DroneModel = ({ pointer }: { pointer: React.MutableRefObject<PointerState> }) => {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF(droneAsset, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    const normalized = useMemo(() => {
        const clone = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.5;
        const scaleFactor = targetSize / maxAxis;
        clone.scale.multiplyScalar(scaleFactor);

        const center = new THREE.Vector3();
        box.getCenter(center);
        clone.position.sub(center.multiplyScalar(scaleFactor));
        return clone;
    }, [scene]);

    useFrame((_, delta) => {
        if (!group.current) return;
        const targetRotY = pointer.current.x * 0.6;
        const targetRotX = pointer.current.y * 0.3;
        group.current.rotation.y += (targetRotY - group.current.rotation.y) * 5 * delta;
        group.current.rotation.x += (targetRotX - group.current.rotation.x) * 5 * delta;
        group.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    });

    return <primitive ref={group} object={normalized} dispose={null} />;
};

useGLTF.preload(droneAsset, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const DroneShowcase = () => {
    const pointer = useRef<PointerState>({ x: 0, y: 0 });

    return (
        <div
            className="min-h-screen w-full text-text"
            onPointerMove={(event) => {
                const { clientX, clientY, currentTarget } = event;
                const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
                const x = ((clientX - left) / width) * 2 - 1;
                const y = ((clientY - top) / height) * 2 - 1;
                pointer.current = { x, y: -y };
            }}
        >


            <header className="flex items-center justify-between px-8 py-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted transition hover:border-accent hover:text-accent"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Studio
                </Link>
                <span className="text-xs uppercase tracking-[0.5em] text-muted">Interactive Lab</span>
            </header>

            <main className="flex flex-col gap-8 px-8 pb-16 lg:flex-row">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:w-1/3"
                >
                    <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted">3D Systems</p>
                    <h1 className="font-display text-5xl font-bold leading-tight">
                        Autonomous Drone
                        <span className="block text-accent">Realtime Render</span>
                    </h1>
                    <p className="text-lg text-muted">
                        Move your cursor across the viewport to influence the drone’s orientation. Built with a responsive
                        rendering stack to preview motion language before on-set deployment.
                    </p>
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.4em] text-muted">Lab Notes</p>
                        <ul className="space-y-2 text-sm text-text/80">
                            <li>— Cursor-driven rotation</li>
                            <li>— Sub-surface glow pass</li>
                            <li>— Suspended contact shadows</li>
                        </ul>
                    </div>
                </motion.section>

                <div className="relative h-[70vh] flex-1 overflow-hidden rounded-[2.5rem] border border-black/10 bg-black/5">
                    <Canvas camera={{ position: [0, 0, 4], fov: 42 }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[3, 4, 5]} intensity={1.2} />
                        <DroneModel pointer={pointer} />
                        <Environment preset="city" />
                        <ContactShadows opacity={0.35} width={15} height={15} blur={2.5} far={5} />
                    </Canvas>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
                </div>
            </main>
        </div>
    );
};

export default DroneShowcase;

