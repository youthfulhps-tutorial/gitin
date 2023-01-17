import { useQuery } from '@tanstack/react-query';
import { getRepo, Repository } from '@shared/apis/repo';
import useInput from '@shared/hooks/useInput';
import useDebounce from '@shared/hooks/useDebounce';
import useRepoRecoilState from '@shared/hooks/useRepoRecoilState';
import { AtomRepoState } from '@shared/atoms/types';
import { useState } from 'react';
import { getDestructuredRepo } from '../utils/dailyRepoHelper';
import { dailyRepoAtom } from '../atoms';

const useDailyRepoQuery = () => {
  const {
    prevRepoState,
    updateAtomRepoState,
    generateUpdatedRepoState,
    resetAtomRepoState,
  } = useRepoRecoilState(dailyRepoAtom);

  const { value, setValue, onChange } = useInput(
    prevRepoState.prevRepo?.name ?? ''
  );
  const debouncedSearchValue = useDebounce(value, 300);

  const [tmpDailyRepoState, setTmpDailyRepoState] =
    useState<AtomRepoState | null>(null);

  useQuery<Repository>({
    queryKey: ['repo', debouncedSearchValue],
    suspense: false,
    enabled: !!debouncedSearchValue,
    queryFn: async () => {
      const { data } = await getRepo(debouncedSearchValue);
      const repo = getDestructuredRepo(data);

      return repo;
    },
    onSuccess: (data) => {
      if (prevRepoState.prevRepo) {
        updateAtomRepoState(data);
      }
      setTmpDailyRepoState(generateUpdatedRepoState(data));
    },
  });

  const resetTmpDailyRepoState = () => {
    setValue('');
    setTmpDailyRepoState(null);
  };

  const resetDailyRepoState = () => {
    resetTmpDailyRepoState();
    resetAtomRepoState();
  };

  return {
    searchInput: value,
    onChange,
    resetDailyRepoState,
    updateAtomRepoState,
    tmpDailyRepoState,
    resetTmpDailyRepoState,
  };
};

export default useDailyRepoQuery;
