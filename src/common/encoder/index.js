export default function Encoder({ TextEncoder, TextDecoder }) {
  const encoder = new TextEncoder('utf-8');
  const decoder = new TextDecoder('utf-8');

  const encode = string => encoder.encode(string);
  const decode = data => decoder.decode(data);

  return { encode, decode };
}
