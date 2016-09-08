# jackmarkham.herokuapp.com

Personal Development Portfolio

# Design Documentation

by jack Markham

## Site audience

- The intended audience of this site is basically anyone who might be looking to hire/employ me for my web development skills, and to show off a some of my own personality in the site.

## Design decisions

- My first decision was to ditch the two main site design options, namely material and minimalist design, as I felt these would be over represented in portfolios and I wanted mine to stand out. I instead chose a retro-looking 8-bit style for the whole page and managed to find assets that suited the aesthetic well.

- I used bootstrap to help make responsive elements (columns) and the jumbotron on the homepage. Initially I also used a bootstrap-supplied navbar, but given the limited number of pages for the site, and the difficulty in making it fit the site's aesthetic, I eventually opted for a simple fixed dive with a couple of links and a log, which I think looks a lot cleaner.

- Instead of the photo's taken in-house I opted for a personal one which I thought showed a little more personality/my cat.

- The hardest/most fiddly part of the design were the javascript elements, which I had trouble getting to load on the pages thanks to some fun "quirks" that Rails has with loading javascript on page navigation. I eventually got around this but using a gem that allows jQuery scripts to load on the page and converting all my js to jQuery.

- I found a really nice image set for the site background and set up a script that cycled between images based on time of day that I'm really happy with, although this took a lot of tweaking to make it functional.

- While I did manage to eventually get the mailgun/action_mailer contact form to work, I felt that the more elegant solution was to just provide a mailto: link of my email. I figured that anyone who would be contacting me would have email and the contact form would be a unnecessary element and would clutter the simple design of the site.

## Supporting documents

1. Github <https://github.com/jackwmarkham/portfolio2>

2. Sitemap <https://jackmarkham.herokuapp.com/sitemap.xml>

3. robots.txt <https://jackmarkham.herokuapp.com/robots.txt>

4. Wireframe (Balsamiq) <https://drive.google.com/file/d/0B6uKZCBYz7lQVFc4QVRlNUczZGc/view?usp=sharing>
