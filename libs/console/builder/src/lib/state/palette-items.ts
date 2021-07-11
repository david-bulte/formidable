import { PaletteGroup, PaletteItem, Type } from '@formidable/shared/renderer';
import {
  checkbox,
  form,
  group,
  input,
  number,
  repeat,
  select,
  textarea,
} from './form-description.util';

const tooltips = {
  customValidation:
    'for example: {"conditions":{"all":[{"fact":"age","operator":"equal","value":"10"}]},"event":{"type":"message","params":{"data":"green"}}}',
};

export const paletteItems: PaletteItem[] = [
  {
    type: Type.FORM,
    props: {},
    requiredProps: [],
    formDescription: form([
      group('props', [checkbox('autosubmit', false, { defaultValue: false })]),
    ]),
  },
  {
    type: Type.ROW,
    group: PaletteGroup.LAYOUT,
    props: {},
    requiredProps: [],
    formDescription: form([group('props', [input('classes')])]),
  },
  {
    type: Type.COL,
    group: PaletteGroup.LAYOUT,
    props: {},
    requiredProps: [],
    formDescription: form([group('props', [input('classes')])]),
  },
  {
    type: Type.GROUP,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['name'],
    formDescription: form([
      group('props', [input('name', true), input('label')]),
    ]),
  },
  {
    type: Type.INPUT,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['name'],
    formDescription: form([
      group('props', [
        input('label', true),
        input('name', true),
        input('classes'),
        input('defaultValue'),
      ]),
      group(
        'validation',
        [
          checkbox('required'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
        {
          label: 'validation',
        }
      ),
      group('visibility', [textarea('custom', false)], {
        label: 'visibility',
      }),
    ]),
  },
  {
    type: Type.TEXTAREA,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['name'],
    formDescription: form([
      group('props', [
        input('label', true),
        input('name', true),
        input('classes'),
        number('rows'),
        input('defaultValue'),
      ]),
      group(
        'validation',
        [
          checkbox('required'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
        {
          label: 'validation',
        }
      ),
    ]),
  },
  {
    type: Type.NUMBER,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['name'],
    formDescription: form([
      group('props', [
        input('label', true),
        input('name', true),
        input('classes'),
        number('defaultValue'),
      ]),
      group(
        'validation',
        [
          checkbox('required'),
          number('min'),
          number('max'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
        {
          label: 'validation',
        }
      ),
    ]),
  },
  {
    type: Type.LABEL,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['label'],
    formDescription: form([
      group('props', [input('label', true), input('classes')]),
    ]),
  },
  {
    type: Type.CHECKBOX,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['label', 'name'],
    formDescription: form([
      group('props', [input('label', true), input('name', true)]),
    ]),
  },
  {
    type: Type.SELECT,
    group: PaletteGroup.BASIC,
    props: {},
    requiredProps: ['name'],
    formDescription: form([
      group('props', [
        input('label', true),
        input('name', true),
        select(
          'mode',
          'radio',
          [
            { value: 'radio', label: 'radio' },
            { value: 'dropdown', label: 'dropdown' },
          ],
          true,
          { defaultValue: 'dropdown' }
        ),
        repeat('options', [
          group('props', [input('label', true), input('value', true)], {
            name: 'option',
          }),
        ]),
      ]),
    ]),
  },
];
