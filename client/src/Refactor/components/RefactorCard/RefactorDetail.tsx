import React from 'react';
import { Repository } from '@shared/apis/repo';
import { RepoIcon, CommitIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRelativeTimeFromNow } from '@shared/utils/date';

type RefactorDetailProps = {
  refactorSuggestedRepo: Repository;
};

const StyledRefactorDetail = styled.div`
  ${tw`text-start`};

  svg {
    ${tw`fill-emerald-300`}
    ${tw`mr-2`}
  }

  a {
    ${tw`hover:text-zinc-400`}
  }
`;

function RefactorDetail({ refactorSuggestedRepo }: RefactorDetailProps) {
  const latestCommit =
    refactorSuggestedRepo.defaultBranchRef.target.history.nodes[0];

  return (
    <StyledRefactorDetail>
      <div className="mb-3 flex">
        <RepoIcon />
        <a href={refactorSuggestedRepo.url}>{refactorSuggestedRepo.name}</a>
      </div>
      <div>
        <div className="mb-1 flex text-xs">
          <CommitIcon />
          <a href={latestCommit.url}>{latestCommit.message}</a>
        </div>

        <div className="mb-1 flex items-center text-xs">
          <img
            src={latestCommit.author.avatarUrl}
            alt="Git actor avatar"
            className="mr-2 ml-6 h-4 w-4 rounded-full"
          />
          <p className="text-zinc-400">
            committed {getRelativeTimeFromNow(latestCommit.committedDate)}
          </p>
        </div>
      </div>
    </StyledRefactorDetail>
  );
}

export default RefactorDetail;
