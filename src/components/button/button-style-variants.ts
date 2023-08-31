export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  UTILITY = 'utility',
  PAGINATION = 'pagination'
}

export const BUTTON_STYLES: { [key in ButtonVariants]: string } = {
  [ButtonVariants.PRIMARY]:
    'border-sky-700 text-sky-700 hover:border-sky-300 hover:text-sky-300',
  [ButtonVariants.SECONDARY]:
    'border-red-600 text-red-600 hover:border-red-300 hover:text-red-300 disabled:hover:border-red-600 disabled:hover:text-red-600',
  [ButtonVariants.UTILITY]: 'border-none bg-neutral-100 rounded-md hover:bg-blue-300',
  [ButtonVariants.PAGINATION]:
      'p-2 border-none bg-neutral-100 rounded-md hover:bg-blue-300 disabled:pointer-events-none disabled:opacity-40'
};
