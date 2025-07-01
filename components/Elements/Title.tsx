/**
 * @file This file is part of LautrerWissen
 * @author Benjamin Bischke
 * @copyright 2025 Vision Impulse GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const TitleStyle = cva('block', {
  variants: {
    as: {
      h1: 'text-[40px] lg:text-[80px] lg:leading-[5.5rem]',
      h2: 'text-[30px] lg:text-[50px] lg:leading-[3.5rem] lg:tracking-tight',
      h3: 'text-[30px] lg:text-[40px] lg:leading-[3rem]',
      h4: 'text-[20px] lg:text-3xl lg:leading-[36px]',
      h5: 'text-base lg:text-xl lg:leading-6 lg:tracking-wide',
      h6: 'text-base lg:text-lg lg:tracking-wide',
      h7: 'text-base leading-7 tracking-wide',
      h8: 'text-sm leading-5 tracking-wide',
      subtitle: 'text-xl lg:text-3xl',
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      inverse: 'text-white',
      dark: 'text-zinc-900',
      eistage: 'text-climate',
      frosttage: 'text-primary',
      heisse_tage: 'text-energy',
      sommertage: 'text-mobility',
      tropennaechte: 'text-buildings',
    },
    font: {
      medium: 'font-medium',
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    font: 'medium',
  },
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  font,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <span
      {...props}
      className={cx(TitleStyle({ as, variant, font }), className)}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </span>
  )
}
