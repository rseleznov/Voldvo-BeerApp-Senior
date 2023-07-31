import React from 'react';
import { Beer } from './beer';

interface SavedListProps {
  savedList: Array<Beer>;
  setSavedList: React.Dispatch<React.SetStateAction<Beer[]>>;
}

export type { SavedListProps };
