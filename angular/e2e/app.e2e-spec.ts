import { GymManageTemplatePage } from './app.po';

describe('GymManage App', function() {
  let page: GymManageTemplatePage;

  beforeEach(() => {
    page = new GymManageTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
