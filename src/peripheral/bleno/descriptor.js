export default function Descriptor(uuid, Parent) {
  return new Parent({ uuid, value: 'Redux Characteristic.' });
}
