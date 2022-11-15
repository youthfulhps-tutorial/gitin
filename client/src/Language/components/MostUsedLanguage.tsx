import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getLanguageColor } from '../utils/languageHelper';

type StyledLanguageProps = {
  gradientTo: string;
};

type MostUsedLanguageProps = {
  name: string;
  lines: number;
};

const StyledLanguage = styled.div<StyledLanguageProps>`
  ${tw`flex flex-col items-start justify-end`};
  ${tw`h-full w-full p-3 rounded-2xl`};
  ${tw`text-zinc-400 drop-shadow-lg`};
  ${tw`hover:text-zinc-100 duration-500`};

  background: ${({ gradientTo }) =>
    `linear-gradient(45deg, #18181b, ${gradientTo ?? '#18181b'})`};
`;

const LanguageName = styled.div`
  ${tw`font-bold`};
`;

const LanguageLines = styled.div`
  ${tw`text-xs`};
`;

function MostUsedLanguage({ name, lines }: MostUsedLanguageProps) {
  return (
    <StyledLanguage gradientTo={getLanguageColor(name)}>
      <LanguageName>{name}</LanguageName>
      <LanguageLines>{`${lines} lines`}</LanguageLines>
    </StyledLanguage>
  );
}

export default MostUsedLanguage;
