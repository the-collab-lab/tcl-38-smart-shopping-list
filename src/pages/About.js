import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

export default function About() {
  return (
    <div>
      <h2>About</h2>
      <h3>How-To</h3>
      <p>
        Get started by selecting "Create a new list" from the homepage. Or, if
        someone has already shared a token with you, enter that into the "Share
        Token" field and select "Join an existing list."{' '}
      </p>
      <p>
        Once you create a new list, select "Add Item" to start adding your
        items. As you purchase your items, check them off your list. If you
        don't plan to buy that item again, delete it. If you leave it, the item
        will reappear unchecked after 24 hours. As you repeatedly buy a
        particular item over time, the app will learn how often you need it, and
        categorize items as to be purchased "soon," "kind of soon," or "not
        soon".
      </p>
      <p>
        To share your list, click the "Share Token" button and your token will
        be copied to the clipboard so you can send it to others.
      </p>
      <h3>Team</h3>
      <p>
        Our team of four collaborated remotely using Agile methodology for eight
        weeks to build this app. We were mentored by three amazing engineering
        leaders: April Leone, Skyler Shaw, and Lars Brekken.
      </p>
      <h5>Cynthia Eddy</h5>
      <a href="https://www.linkedin.com/in/cynthiaeddy">
        <AiFillLinkedin />
      </a>
      <a href="https://github.com/cynthiaeddy">
        <AiFillGithub />
      </a>
      <h5>Chris Korsak</h5>
      <a href="https://www.linkedin.com/in/chriskorsak">
        <AiFillLinkedin />
      </a>
      <a href="https://github.com/chriskorsak">
        <AiFillGithub />
      </a>
      <h5>Kristen Monnik</h5>
      <a href="https://www.linkedin.com/in/kristenmonnik/">
        <AiFillLinkedin />
      </a>
      <a href="https://github.com/k-monnik">
        <AiFillGithub />
      </a>
      <h5>Diyana Mendoza-Price</h5>
      <a href="https://www.linkedin.com/in/diyana-mendoza-price/">
        <AiFillLinkedin />
      </a>
      <a href="https://github.com/diyanamendoza">
        <AiFillGithub />
      </a>
    </div>
  );
}
