import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Gatherer from './components/Gatherer/Gatherer';
import NewsManager from './components/News/NewsManager';
import Companies from './components/Companies/Companies';
import NavigationHeading from './components/General/NavigationHeading';
import CompanyModal from './components/Company/CompanyModal';

export default function App() {
  const initialTabKey = "gatherer"

  return (
      <div className="App mt-3"> 
        <Container>
          <NavigationHeading />
          <CompanyModal />
          <Tabs 
          defaultActiveKey={initialTabKey}
          id="uncontrolled-tab-example" 
          className="mb-3" >
            <Tab eventKey="gatherer" title="Gatherer">
              <Gatherer />
            </Tab>
            <Tab eventKey="news" title="News">
              <NewsManager/>
            </Tab>
            <Tab eventKey="companies" title="Companies">
              <Companies />
            </Tab>
          </Tabs>
        </Container>
    </div>
  );
}