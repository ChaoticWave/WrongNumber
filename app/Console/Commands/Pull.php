<?php namespace ChaoticWave\WrongNumber\Console\Commands;

use ChaoticWave\WrongNumber\Ciphers\CipherManager;
use Vinelab\Rss\Rss;

class Pull extends AppCommand
{
    //******************************************************************************
    //* Members
    //******************************************************************************

    /** @inheritdoc */
    protected $signature = 'wn:pull {--feed=}';
    /** @inheritdoc */
    protected $description = 'Pull an RSS feed';

    //******************************************************************************
    //* Methods
    //******************************************************************************

    /** @inheritdoc */
    public function handle()
    {
        $_feed = $this->option('feed');

        return $this->readFeed($_feed);
    }

    protected function readFeed($feed = null)
    {
        $_feeds = [$feed] ?: config('feeds', []);
        $_rss = new Rss();

        foreach ($_feeds as $_name => $_url) {
            /** @var \Vinelab\Rss\ArticlesCollection $_rssFeed */
            $_rssFeed = $_rss->feed($_url);

            foreach ($_rssFeed as $_article) {
                $this->writeln('Article: ' . $_article->title);
            }

            unset($_name, $_url, $_rssFeed, $_rss);
        }
    }

    /**
     * Calculates the value of $text
     *
     * @param string $text
     * @param string $system
     */
    protected function applyCipher($text, $system)
    {
        $_reduced = 0;
        $_value = CipherManager::make($system)->calculate($text, $_reduced);

        $this->writeln('<info>The value of "' .
            $text .
            '" in ' .
            studly_case($system) .
            ' gematria is: <comment>' .
            $_value .
            ' (' .
            $_reduced .
            ')</comment></info>');
    }
}
