import {useEffect} from "react";
import TitleBar from "../TitleBar";
import "./info.css";

function Info({getDates}) {
  useEffect(() => {
    getDates(new Date())
  }, [])
  return (
    <div className="info_container">
      <div className="info_content_container">
        <TitleBar title="League Info" />
        <div className="league_info_container">
          <h2>About the Capital Hockey Conference</h2>
          <p>
            With the CHC now in its 23rd season, the Conference’s recognition
            further enhances what it has tried to achieve since its founding;
            hard, clean, competitive hockey, academic and athletic success for
            its teams and players, and a statewide reputation for excellence.
          </p>
          <p>
            The 2022-23 season was amazing for the CHC. This was highlighted
            with Olentangy Liberty claiming the first OHSAA State Championship
            in league history. Coming off their Blue Jackets Cup Championship,
            the Patriots rolled through the Columbus bracket only giving up 4
            goals total on their way to the State Final-Four. In the State
            Semi-Finals, they defeated Cleveland St. Ignatius by a score of 4-3.
            That victory advanced Liberty to their first ever Sate Championship
            game, and they become the second ever State Finalist for the CHC
            (Jerome '19). In the Championship game, Liberty defeated University
            School 6-2 to bring the first every OHSAA State Championship to
            Central Ohio. The Patriots finished the season with a record of
            39-1-1.
          </p>
          <p>
            COLUMBUS, Ohio – Olentangy Liberty’s senior forward Charlie Hughes
            scored a state record four goals as the Patriots defeated University
            School 6-2 in the 2023 OHSAA Ice Hockey State Final on at Nationwide
            Arena on Sunday. This was Liberty’s first appearance in the state
            final while University School was making their sixth state final
            appearance. This marked the first time a school from central Ohio
            has won the OHSAA ice hockey state championship in its 46 years of
            existence. This was University School’s fourth time receiving
            runner-up honors. Liberty got on top midway through the first period
            as Hughes scored his first goal of the game to give the Patriots a
            1-0 advantage heading into the second period. Olentangy broke away
            with three goals in the span of just over three minutes. Hughes
            scored with just over five minutes gone in the second period before
            his teammate senior defender Carson Reynolds scored the Patriots
            third a minute and a half later. Just under two minutes later,
            Hughes would get his hat-trick to give Liberty a 4-0 lead with
            around 11 minutes to play in the second period. University School
            fought back into the game with two quick goals near the end of the
            second period. Senior forward Samonte Martin and junior forward Luke
            Palmer both scored within 30 seconds of one another to make the
            score 4-2 in favor of Liberty heading into the final period. The
            Patriots would gain that momentum back as Hughes scored his fourth
            goal of the match midway through the third period. Liberty scored
            one more goal for comfort, this time off the stick of senior
            defender Vinny Rengel, to give them a 6-2 victory over the Preppers.
          </p>
          <img src= "../../src/assets/stateshamps.jpg" alt="" />
          <h2>Our History</h2>
          <p>
            The 16 Columbus area schools are Columbus Academy, Bishop Watterson,
            Dublin Coffman, Dublin Jerome, Dublin Scioto, Gahanna Lincoln, New
            Albany, Olentangy, Olentangy Berlin, Olentangy Liberty, Olentangy
            Orange, St. Francis DeSales, St. Charles Prep., Thomas Worthington,
            Upper Arlington and Worthington Kilbourne. Cincinnati is represented
            by Archbishop Moeller and St. Xavier, while Dayton is represented by
            Springboro.
          </p>
          <table className="team_history_table">
            <thead>
              <tr>
                <td>Team</td>
                <td>Year Joined CHC</td>
                <td>Year Joined OHSAA</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Upper Arlington</td>
                <td>2003</td>
                <td>1977</td>
              </tr>
              <tr>
                <td>Thomas Worthington</td>
                <td>2003</td>
                <td>1998</td>
              </tr>
              <tr>
                <td>Worthington Kilborne</td>
                <td>2003</td>
                <td>1998</td>
              </tr>
              <tr>
                <td>St.Charles</td>
                <td>2003</td>
                <td>1999</td>
              </tr>
              <tr>
                <td>Dublin Coffman</td>
                <td>2003</td>
                <td>2002</td>
              </tr>
              <tr>
                <td>Dublin Scioto</td>
                <td>2003</td>
                <td>2002</td>
              </tr>
              <tr>
                <td>Gahanna</td>
                <td>2003</td>
                <td>2002</td>
              </tr>
              <tr>
                <td>Dublin Jerome</td>
                <td>2004</td>
                <td>2004</td>
              </tr>
              <tr>
                <td>St.Francis DeSales</td>
                <td>2006</td>
                <td>2006</td>
              </tr>
              <tr>
                <td>Olentangy Liberty</td>
                <td>2007</td>
                <td>2007</td>
              </tr>
              <tr>
                <td>Olentangy</td>
                <td>2008</td>
                <td>2008</td>
              </tr>
              <tr>
                <td>Olentangy Orange</td>
                <td>2008</td>
                <td>2008</td>
              </tr>
              <tr>
                <td>Bishop Watterson</td>
                <td>2009</td>
                <td>2009</td>
              </tr>
              <tr>
                <td>Archbishop Moeller</td>
                <td>2009</td>
                <td>1982</td>
              </tr>
              <tr>
                <td>New Albany</td>
                <td>2015</td>
                <td>2015</td>
              </tr>
              <tr>
                <td>Springboro</td>
                <td>2016</td>
                <td>2003</td>
              </tr>
              <tr>
                <td>Columbus Academy</td>
                <td>2018</td>
                <td>2018</td>
              </tr>
              <tr>
                <td>Olentangy Berlin</td>
                <td>2018</td>
                <td>2018</td>
              </tr>
              <tr>
                <td>St.Xavier</td>
                <td>2019</td>
                <td>2004</td>
              </tr>
            </tbody>
          </table>
          <p>
            Historically, Upper Arlington is the Conference’s oldest OHSAA team,
            becoming a Varsity sport in 1977. In the late 1990’s, programs began
            at Thomas Worthington and Worthington Kilbourne (1998), followed
            shortly thereafter by St. Charles Prep. (1999) Teams formally played
            in SWOHSHL, then a Columbus-Dayton-Cincinnati League. In fall 2002,
            SWOHSHL experienced rapid growth with the addition of Dublin
            Coffman, Dublin Scioto and Gahanna Lincoln. As a result of now
            having 7 Columbus area teams, those schools banded together to form
            the CHC in 2003. The Conference then added Dublin Jerome in 2004,
            St. Francis DeSales in 2006, Olentangy Liberty in 2007, Olentangy
            and Olentangy Orange in 2008, Bishop Watterson and Cincinnati
            Archbishop Moeller in 2009, New Albany in 2015, Springboro in 2016,
            Columbus Academy and Olentangy Berlin in 2018 and St. Xavier in
            2019.
          </p>
          <p>
            As indicated above, the Conference has enjoyed great growth, more
            than tripling since its inception and mirroring the phenomenal
            growth in Columbus youth hockey. The last few years have been
            particularly successful for the CHC on the ice as Conference members
            Dublin Coffman (2010, 2016), Dublin Jerome (2015, 2018, 2019),
            Olentangy Liberty (2011, 2013, 2017, 2023), Olentangy Orange (2012),
            St. Charles Prep. (2014) and Upper Arlington (2006, 2007, 2021,
            2022) have advanced to the Ohio Frozen Four. In 2020 New Albany
            would have made their 1st Frozen Four appearance if not for the fact
            that the Tournament was cancelled just days before it was to begin
            as a result of the COVID-19 pandemic. Archbishop Moeller (2005) and
            St. Xavier (2008) both advanced to the Frozen Four before they
            became part of the CHC. This year, the Conference has remained in a
            three (3) division format based on expected squad size and recent
            success. Divisions and teams in the respective divisions are as
            follows
          </p>
          <section className="league_divisions_section"></section>
          <p>
            All Red and White will play 16 league games. All Blue teams will
            play 14 league games. RED teams will play home-and-home within their
            division and single games with all 6 WHITE teams (16 games) WHITE
            teams will play each WHITE team once, each RED team once and eash
            BLUE team once (16 games) BLUE teams will play home and home within
            their division and each WHITE team once (14 games)
          </p>
          <p>
            Moving forward, divisions will be continue to be reshuffled every
            year. The winner of the White division will swap divisions with the
            6th place Red division team. The winner of the Blue division will
            swap divisions with the 6th place White division team.
          </p>
          <p>
            The Blue Jackets Cup Tournaments (Championship and Consolation) will
            have the teams drawn by Red, White and Blue Division final league
            standings. For the 2023-24 Championship Tournament, the teams
            qualifying will be the top 5 Red division teams (seeded 1 through
            5), the top 2 White division teams (seeded #6 and #7), and the
            winner of Red #6 vs White #3 regular season game (seed #8 seed). All
            of the remaining teams will play in the Consolation Tournament
          </p>
          <p>
            The Conference has also been part of the OHSAA shift to Columbus.
            Originally, Columbus based teams were sent to their district
            tournaments at Bowling Green or Toledo, Ohio. The tournament was
            ultimately moved to Troy, Ohio. Finally, in 2006 the District
            Tournament was primarily moved to the Columbus Blue Jackets practice
            facility, the Ohio Health Ice Haus in Columbus, Ohio, and remains
            there today. (The Ice Haus is also the primary site of the annual
            Blue Jackets Cup Tournament.) The highlight of the District
            Tournament’s move to Columbus has been the District Final,
            consistently played before SRO overflow crowds at the Ice Haus
          </p>
          <p>
            A constant in the CHC is the fierce competition among its members.
            Conference highlights include:
          </p>
          <table className="total_championship_table">
            <thead>
              <tr>
                <td></td>
                <td>Regular Season Title</td>
                <td>Blue Jackets Cup Title</td>
                <td>State Final Four</td>
                <td>State Finalist</td>
                <td>State Champion</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Archbishop Moeller</td>
                <td>-</td>
                <td>-</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Dublin Coffman</td>
                <td>3</td>
                <td>4</td>
                <td>2</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Dublin Jerome</td>
                <td>4</td>
                <td>9</td>
                <td>3</td>
                <td>1</td>
                <td>-</td>
              </tr>
              <tr>
                <td>New Albany</td>
                <td>-</td>
                <td>-</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Olentangy Berlin</td>
                <td>-</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Olentangy Liberty</td>
                <td>5</td>
                <td>2</td>
                <td>4</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Olentangy Orange</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>St.Charles</td>
                <td>4</td>
                <td>1</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>St.Xavier</td>
                <td>-</td>
                <td>-</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Thomas Worthington</td>
                <td>-</td>
                <td>2</td>
                <td>1</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Upper Arlington</td>
                <td>4</td>
                <td>2</td>
                <td>4</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <p>
            * Indicates New Albany would have been a State Semi-finalist in
            '19-'20 if the Frozen Four Tournament would have been played and not
            cancelled because of COVID-19.
          </p>
          <table className="league_championship_table">
            <thead>
            <th colspan="3">Previous Varsity Champions</th>
              <tr>
                <td>Season</td>
                <td>Regular Season Champion</td>
                <td>Blue Jackets Cup Champion</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-23</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Olentangy Liberty</td>
              </tr>
              <tr>
                <td>2021-22</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Olentangy Berlin</td>
              </tr>
              <tr>
                <td>2020-21</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Upper Arlington</td>
              </tr>
              <tr>
                <td>2019-20</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Upper Arlington</td>
              </tr>
              <tr>
                <td>2018-19</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Dublin Jerome</td>
              </tr>
              <tr>
                <td>2017-18</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Dublin Jerome</td>
              </tr>
              <tr>
                <td>2016-17</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Dublin Jerome</td>
              </tr>
              <tr>
                <td>2015-16</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Dublin Coffman</td>
              </tr>
              <tr>
                <td>2014-15</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Olentangy Orange</td>
              </tr>
              <tr>
                <td>2013-14</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>St.Charles</td>
              </tr>
              <tr>
                <td>2012-13</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Dublin Jerome</td>
              </tr>
              <tr>
                <td>2011-12</td>
                <td>
                  <ul>
                    <li>Red - Olentangy Liberty</li>
                    <li>White - Olentangy</li>
                    <li>Blue - Gahanna</li>
                  </ul>
                </td>
                <td>Olentangy Liberty</td>
              </tr>
            </tbody>
          </table>
          <table className="league_contacts_table">
            <thead>
              <th colSpan="3">League Contacts</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Bruce McClary</bold>
                    </li>
                    <li>
                      <small>Head Commissioner</small>
                    </li>
                  </ul>
                </td>
                <td>740-965-2618</td>
                <td>bmcclary12031@gmail.com</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Chris Khan</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner-Scheduling</small>
                    </li>
                  </ul>
                </td>
                <td>614-832-3647</td>
                <td>genghis59@yahoo.com</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Todd Baker</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner - Hockey Developement</small>
                    </li>
                  </ul>
                </td>
                <td>614-582-6007</td>
                <td>tbaker@ohioeye.org</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Ryan Druseikis</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner - Treasury</small>
                    </li>
                  </ul>
                </td>
                <td>614-747-0040</td>
                <td>druseikis.2@osu.edu</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Jessica Brennan</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner - Secretary</small>
                    </li>
                  </ul>
                </td>
                <td>614-203-6931</td>
                <td>chchockeyinfo@gmail.com</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>J.J. Stallsworth</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner - Website</small>
                    </li>
                  </ul>
                </td>
                <td>614-769-4617</td>
                <td>jj_stalls@hotmail.com</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>Gary Wilkins</bold>
                    </li>
                    <li>
                      <small>Asst. Commissioner - Head Referee</small>
                    </li>
                  </ul>
                </td>
                <td>740-965-5004</td>
                <td>director@colsicerefs.com</td>
              </tr>
              <tr>
                <td>
                  <ul>
                    <li>
                      <bold>JD Kershaw</bold>
                    </li>
                    <li>
                      <small>
                        Columbus Blue Jackets VP of Operations and Development
                      </small>
                    </li>
                  </ul>
                </td>
                <td>614-246-4159</td>
                <td>jdkershaw@bluejackets.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Info;
