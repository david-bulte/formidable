import { PaletteItem, Type } from '@formidable/shared/renderer';

const tooltips = {
  customValidation:
    'for example: {"conditions":{"all":[{"fact":"age","operator":"equal","value":"10"}]},"event":{"type":"message","params":{"data":"green"}}}',
};

export const paletteItems: PaletteItem[] = [
  {
    type: Type.FORM,
    props: {},
    requiredProps: [],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [checkbox('autosubmit', false, { defaultValue: false })],
      },
    ],
  },
  {
    type: Type.ROW,
    props: {},
    requiredProps: [],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('classes')],
      },
    ],
  },
  {
    type: Type.COL,
    props: {},
    requiredProps: [],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('classes')],
      },
    ],
  },
  {
    type: Type.GROUP,
    props: {},
    requiredProps: ['name'],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('name', true), input('label')],
      },
    ],
  },
  {
    type: Type.INPUT,
    props: {},
    requiredProps: ['name'],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [
          input('label', true),
          input('name', true),
          input('classes'),
          input('defaultValue'),
        ],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [
          checkbox('required'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
      },
    ],
  },
  {
    type: Type.TEXTAREA,
    props: {},
    requiredProps: ['name'],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [
          input('label', true),
          input('name', true),
          input('classes'),
          number('rows'),
          input('defaultValue'),
        ],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [
          checkbox('required'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
      },
    ],
  },
  {
    type: Type.NUMBER,
    props: {},
    requiredProps: ['name'],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [
          input('label', true),
          input('name', true),
          input('classes'),
          number('defaultValue'),
        ],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [
          checkbox('required'),
          number('min'),
          number('max'),
          textarea('custom', false, { tooltip: tooltips.customValidation }),
        ],
      },
    ],
  },
  {
    type: Type.LABEL,
    props: {},
    requiredProps: ['label'],
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('label', true), input('classes')],
      },
    ],
  },
];

function input(labelName, required = false, defaultProps = {}) {
  return {
    type: Type.INPUT,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

function number(labelName, required = false, defaultProps = {}) {
  return {
    type: Type.NUMBER,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

function checkbox(labelName, required = false, defaultProps = {}) {
  return {
    type: Type.CHECKBOX,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}

function textarea(labelName, required = false, defaultProps = {}) {
  return {
    type: Type.TEXTAREA,
    props: {
      label: labelName,
      name: labelName,
      ...defaultProps,
    },
    validation: {
      required,
    },
  };
}
