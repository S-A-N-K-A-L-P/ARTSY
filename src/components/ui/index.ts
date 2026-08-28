/**
 * Design system primitives.
 *
 * Everything here is token-driven (no hardcoded colours, no MUI) so it works
 * across all nine aesthetics. Prefer these over hand-rolling utility strings:
 * the app previously had no shared Button/Input/Card, which is why no two
 * screens matched and why most of them broke on the dark themes.
 */
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Field, Label, Input, Textarea, Select } from './Field';
export type { FieldProps, InputProps, TextareaProps, SelectProps } from './Field';

export { Stack, Inline, Page, Section, Card, CardButton } from './Layout';

export { Spinner, Skeleton, SkeletonCard, SkeletonGrid, EmptyState, Alert } from './Feedback';

export { Badge, Avatar, Stat, Tabs, Table, Td, DescriptionList } from './Display';
export type { TabItem } from './Display';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';
