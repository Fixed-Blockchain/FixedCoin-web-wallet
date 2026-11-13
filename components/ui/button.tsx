import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-transparent bg-clip-padding text-sm font-extrabold whitespace-nowrap outline-none select-none transition-all duration-200 ease-out before:pointer-events-none before:absolute before:inset-x-[18%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent hover:-translate-y-0.5 active:not-aria-[haspopup]:translate-y-0 active:not-aria-[haspopup]:scale-[0.985] focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45 motion-reduce:transition-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 group-hover/button:[&_svg]:scale-110 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-[#ffd86a]/48 bg-gradient-to-b from-[#f4c64f] to-[#dfa31e] text-[#090b0d] shadow-[0_12px_32px_rgba(224,169,40,0.16),inset_0_-2px_0_rgba(92,58,0,0.20)] hover:border-[#ffe49a]/80 hover:from-[#ffe08a] hover:to-[#e5ac27] hover:shadow-[0_16px_38px_rgba(224,169,40,0.22),inset_0_-2px_0_rgba(92,58,0,0.18)]',
        outline:
          'border-[#6b9ab4]/34 bg-[#0b141d] text-[#d9e2e8] shadow-[inset_0_0_20px_rgba(70,191,209,0.025)] hover:border-[#46bfd1]/55 hover:bg-[#122431] hover:text-white aria-expanded:bg-muted aria-expanded:text-foreground',
        secondary:
          'border-[#6b9ab4]/20 bg-secondary text-secondary-foreground hover:border-[#46bfd1]/35 hover:bg-[#1c2a36] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'text-[#9aabb7] before:hidden hover:bg-[#46bfd1]/10 hover:text-white aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-11 gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5',
        xs: "h-9 gap-1 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-11 gap-1.5 rounded-lg px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-13 gap-2 rounded-lg px-5 has-data-[icon=inline-end]:pr-4.5 has-data-[icon=inline-start]:pl-4.5',
        icon: 'size-11',
        'icon-xs':
          "size-9 rounded-lg in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-11 rounded-lg in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
