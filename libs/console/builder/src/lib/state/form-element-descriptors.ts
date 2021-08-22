import {
  PaletteGroup,
  FormElementDescriptor,
  FormElementType,
} from '@formidable/shared/renderer';
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

export const DEFAULT_FORM_ELEMENT_DESCRIPTORS: FormElementDescriptor[] = [
  {
    type: FormElementType.FORM,
    requiredProps: [],
    propsForm: form([
      group('props', [checkbox('autosubmit', { defaultValue: false })]),
    ]),
  },
  {
    type: FormElementType.ROW,
    group: PaletteGroup.LAYOUT,
    requiredProps: [],
    propsForm: form([group('props', [input('classes')])]),
  },
  {
    type: FormElementType.COL,
    group: PaletteGroup.LAYOUT,
    requiredProps: [],
    propsForm: form([group('props', [input('classes')])]),
  },
  {
    type: FormElementType.GROUP,
    group: PaletteGroup.BASIC,
    requiredProps: ['name'],
    propsForm: form([group('props', [input('name', true), input('label')])]),
  },
  {
    type: FormElementType.INPUT,
    group: PaletteGroup.BASIC,
    requiredProps: ['name'],
    propsForm: form([
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
    type: FormElementType.TEXTAREA,
    group: PaletteGroup.BASIC,
    requiredProps: ['name'],
    propsForm: form([
      group('props', [
        input('label', true),
        input('name', true),
        input('classes'),
        number('rows', true, { label: 'test' }),
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
    type: FormElementType.NUMBER,
    group: PaletteGroup.BASIC,
    requiredProps: ['name'],
    propsForm: form([
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
    type: FormElementType.LABEL,
    group: PaletteGroup.BASIC,
    requiredProps: ['label'],
    propsForm: form([group('props', [input('label', true), input('classes')])]),
  },
  {
    type: FormElementType.CHECKBOX,
    group: PaletteGroup.BASIC,
    requiredProps: ['label', 'name'],
    propsForm: form([
      group('props', [input('label', true), input('name', true)]),
    ]),
  },
  {
    type: FormElementType.SELECT,
    group: PaletteGroup.BASIC,
    requiredProps: ['name'],
    propsForm: form([
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
