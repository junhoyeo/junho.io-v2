'use client';

import styled from '@emotion/styled';
import { useMagneticPull } from 'motion-plus/react';
import { motion } from 'motion/react';
import { useRef } from 'react';

export default function IOSPointer() {
  const ref = useRef<HTMLButtonElement>(null);
  const pull = useMagneticPull(ref, 0.1);

  return (
    <Container>
      <StyledButton ref={ref} whileTap="pressed">
        <motion.span variants={{ pressed: { scale: 0.95 } }} style={pull}>
          <Chevron />
          Appearance
        </motion.span>
      </StyledButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(motion.button)`
  background: none;
  padding: 8px;
  color: #0a84ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.27);
  border-radius: 0;
  user-select: none;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;

  & > span {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

function Chevron() {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2L2 10L10 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
