export default function Encoder({ TextEncoder, TextDecoder}) { 
  const encoder = new TextEncoder('utf-8');
  const decoder = new TextDecoder('utf-8');

  const encode = (json) => { 
    const string = JSON.stringify(json);
    return encoder.encode(string);
  }

  const decode = (data) => { 
    const string = decoder.decode(data);
    const json = JSON.parse(string);
    return typeof json === 'string' ? JSON.parse(json) : json;
  }

  return { encode, decode };
}