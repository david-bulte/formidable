import { PaletteItem, Type } from '@formidable/shared/renderer';

export const paletteItems: PaletteItem[] = [
  {
    type: Type.ROW,
    props: {},
    propDescriptors: [input('classes')],
  },
  {
    type: Type.GROUP,
    props: {},
    propDescriptors: [input('name', true), input('label')],
  },
  {
    type: Type.INPUT,
    props: {},
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('label', true), input('name', true), input('classes')],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [checkbox('required'), textarea('custom')],
      },
    ],
  },
  {
    type: Type.TEXTAREA,
    props: {},
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('label', true), input('name', true), input('classes'), number('rows')],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [checkbox('required'), textarea('custom')],
      },
    ],
  },
  {
    type: Type.NUMBER,
    props: {},
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [input('label', true), input('name', true), input('classes')],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation',
        },
        children: [checkbox('required'), textarea('custom')],
      },
    ],
  },
];

function input(labelName, required = false) {
  return {
    type: Type.INPUT,
    props: {
      label: labelName,
      name: labelName,
    },
    validation: {
      required,
    },
  };
}

function number(labelName, required = false) {
  return {
    type: Type.NUMBER,
    props: {
      label: labelName,
      name: labelName,
    },
    validation: {
      required,
    },
  };
}

function checkbox(labelName, required = false) {
  return {
    type: Type.CHECKBOX,
    props: {
      label: labelName,
      name: labelName,
    },
    validation: {
      required,
    },
  };
}

function textarea(labelName, required = false) {
  return {
    type: Type.TEXTAREA,
    props: {
      label: labelName,
      name: labelName,
    },
    validation: {
      required,
    },
  };
}
