import GridMain from '@layout/components/GridMain';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Repository from '../../../Repository/components';

function HomePage() {
  return (
    <GridMain>
      <Login />
      <SuspenseBoundary gridArea="user-profile">
        <UserProfile />
      </SuspenseBoundary>
      <SuspenseBoundary gridArea="language">
        <Language />
      </SuspenseBoundary>
      <SuspenseBoundary gridArea="repository">
        <Repository />
      </SuspenseBoundary>
    </GridMain>
  );
}

export default HomePage;
