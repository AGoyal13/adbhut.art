// src/app/data/artworks.ts

import { ArtWork } from "src/app/art-work";

export const artworks: ArtWork[] = [
  {
    id: 'a1',
    title: 'Lady with the Lamb',
    thumb: 'assets/artwork1.png',
    image: 'assets/artwork1.png',
    alt: 'Lady with the Lamb',
    year: 2025,
    medium: 'Acrylic on Canvas',
    dimensions: '14 x 18 inches',
    description: `<div class="art-writeup">
    <div>
      <strong>Just as Florence Nightingale's lamp brought light to suffering,</strong> the
      <em>“Lady with the Lamb”</em> brings the eternal light of maternal love to protect and nurture
      innocence, representing women as compassionate healers and protectors of the vulnerable.
      Within the vibrant borders, the artwork holds the eternal story of nurturing love — a woman's
      gentle hands cradling innocence, her eyes reflecting the timeless compassion that flows
      through generations.
    </div>
  
    <div>
      An ode to feminine compassion in protecting the innocent, serving as an eternal beacon of
      hope and unconditional love.
    </div>
  </div>`,
    tags: ['harbor', 'landscape', 'plein-air'],
    price: null
  },
  {
    id: 'a2',
    title: 'Divine Innocence',
    thumb: 'assets/artwork2.png',
    image: 'assets/artwork2.png',
    alt: 'Divine Innocence',
    year: 2025,
    medium: 'Acrylic on Canvas',
    dimensions: '14 x 18 inches',
    description: `Goddess Durga in her childhood form, radiates divine serenity through her youthful face adorned
    with a magnificent golden crown and traditional sacred markings. The rich warm tones of gold,
    red, and orange create a luminous aura around the young goddess depicting the paradox of divine
    power dwelling within innocent childhood. Her graceful hand gesture and compassionate eyes
    embody the eternal maternal protection and boundless love that Durga represents, even in her
    tender years.`,
    tags: ['urban', 'study'],
    price: null
  },
  {
    id: 'a3',
    title: `The Waiting Beauty: Love's Sweet Echo`,
    thumb: 'assets/artwork3.png',
    image: 'assets/artwork3.png',
    alt: `The Waiting Beauty: Love's Sweet Echo`,
    year: 2024,
    medium: 'Acrylic on Canvas',
    dimensions: '14 x 18 inches',
    description: `<div class="art-writeup">
    <div>
      The painting captures a poignant moment of <strong>romantic longing and tender companionship</strong>.
      The elegant lady is the archetypal beloved waiting for her lover’s return. Her serene yet wistful
      expression is filled with both patience and yearning as she passes the hours in quiet anticipation.
    </div>
  
    <div>
      The parrots are her faithful companions in solitude. One of them has learned to mimic the
      beloved’s voice, bringing precious moments of joy to her waiting heart. A gentle smile crosses
      her lips when the clever bird repeats familiar words of endearment, creating the fleeting illusion
      of her beloved’s presence.
    </div>
  
    <div>
      The painting captures that bittersweet moment when <em>memory and hope intertwine</em> — as the
      parrot’s mimicry offers comfort while simultaneously deepening the ache for the true presence
      of the one she loves.
    </div>
  </div>
  `,
    tags: ['landscape', 'light'],
    price: null
  },
  {
    id: 'a4',
    title: 'Mirror Mirror in My Hand',
    thumb: 'assets/artwork4.png',
    image: 'assets/artwork4.png',
    alt: 'Mirror Mirror in My Hand',
    year: 2025,
    medium: 'Acrylic on Canvas',
    dimensions: '14 x 18 inches',
    description: `The painting captures the essence of healthy self-appreciation and inner confidence. The woman&#39;s
    gentle gaze into the mirror reflects a moment of genuine self-recognition and acceptance. Her
    serene expression and graceful posture convey a deep sense of contentment with who she
    is—celebrating her cultural identity, her beauty, and her heritage with quiet dignity.
    The soft smile and bright eyes reveal someone who has found harmony within herself. This is the
    face of a woman who knows her worth, appreciates her unique beauty, and feels genuinely
    comfortable in her own skin. The painting captures that precious moment when self-love
    manifests as pure joy—a reminder that feeling good about oneself is both healthy and beautiful.
    The lady doesn&#39;t ask &quot;who is fairest?&quot; and this transforms the entire narrative from the fairy tale&#39;s
    anxiety-driven quest for supremacy to a peaceful moment of self-acceptance and cultural pride.
    It&#39;s about owning your reflection rather than being owned by others&#39; opinions.`,
    tags: ['harbor', 'blue'],
    price: null
  },
  {
    id: 'a5',
    title: `Mirabai's Divine Devotion`,
    thumb: 'assets/artwork5.png',
    image: 'assets/artwork5.png',
    alt: `Mirabai's Divine Devotion`,
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 14 inches',
    description: `<div class="art-writeup art-poem">
    <div>
      In red silk adorned, with jewels so bright,<br>
      Mira is lost in the devotional sight.<br>
      Her eyes reflect a love so pure and true,<br>
      For Krishna, her Lord with skin of blue.
    </div>
  
    <div>
      The flute-playing God with peacock crown,<br>
      Calls to her heart with that sacred sound.<br>
      While family speaks of earthly ties,<br>
      Her soul with Krishna’s melody flies.
    </div>
  
    <div>
      <em>
        “How can I wed another’s hand,<br>
        When yours, O Lord, I understand?<br>
        My heart beats only for your song,<br>
        To you alone do I belong.”
      </em>
    </div>
  
    <div>
      The painting speaks of <strong>love divine</strong>,<br>
      Where mortal soul and God combine.<br>
      <em>
        “My heart is already wed to thee,<br>
        O Krishna, my eternal beloved, set me free.”
      </em>
    </div>
  </div>
  `,
    tags: ['harbor', 'blue'],
    price: null
  }
];
