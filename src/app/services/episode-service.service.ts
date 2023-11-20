import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  public episodesDatabase: any = {
    'Sword Art Online': {
      1: 'https://mega.nz/embed/N3FSzQyY#gZHxNjMPNIY03K_QOUIUtYzvpciSbbrv4j7MgazlVjI',
      2: 'https://mega.nz/embed/hvVzASwZ#bxbREgsKwGRTwZx8Ak3p6fbHHZ5zOLsuoaUDx5gkbXM',
      3: 'https://mega.nz/embed/F2FgHIgS#ekMNgSExbY1wbeunmD2MdeP-tTfm4ifqONNOfxMaU7A',
      4: 'https://www.yourupload.com/embed/4uH4I8P8mOOp',
    },
    'Dragon Ball Z': {
      1: 'https://mega.nz/embed/Z3MHjChJ#jDEPKjHUrvVXdrTMO3DF021qnAsMd6Hw45OmrrGiHZA'
    },
    'Inazuma Eleven': {
      1: 'https://mega.nz/embed/AqEy3JJT#4615TAIwtvCveFG5wGkk9Jrzr__wyxijv49bNz99yYo',
      2: 'https://www.yourupload.com/embed/F7244MKD6i5U'
    },
    
    'Naruto Shippuden': {
      1: 'https://mega.nz/embed/Yjt0gLCC#3aPD8iyaXgw-yPHukilQLEnVs7y1dF3sBhQqRJ2kLow'
    },
    
    'One Piece': {
      1: 'https://mega.nz/embed/92tWURID#5HBUPefxIcRQX4VNe-cHoNy79qZF1k-E1SBcGA6B55g'
    },
    
    'Shigatsu wa Kimi no Uso': {
      1: 'https://mega.nz/embed/1n1y0RTI#KEdBhcaRm8VVa-Wy3t6nt_5kl83amPyMkI2Gn6QqnEw'
    },
    'Haikyuu': {
      1: 'https://streamtape.com/e/wOdeB46aA8cGzB/'
    },
    'Kimetsu no Yaiba': {
      1: 'https://hqq.tv/player/embed_player.php?vid=N3BuSVJydVIvZDRBWWhOTkdBVkIrZz09'
    },
    'Your Name': {
      1: 'https://www.yourupload.com/embed/jaG5q38prR6c'
    },
    'Captain Tsubasa': {
      1: 'https://www.yourupload.com/embed/Pw66B4Y3f55V',
      2: 'https://www.yourupload.com/embed/63Xnjc48PYef'
    },
    
    // ... más animes ...
  };
  
  getVideoUrl(animeName: string, episodeNumber: number): string | null {
    const animeEpisodes = this.episodesDatabase[animeName];
    if (animeEpisodes && animeEpisodes[episodeNumber]) {
      return animeEpisodes[episodeNumber];
    }
    return null; // Devuelve null si el episodio no se encuentra en la base de datos
  }
  
}
