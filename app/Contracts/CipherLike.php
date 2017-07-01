<?php namespace ChaoticWave\WrongNumber\Contracts;

/**
 * Something that provides a map of characters to numbers
 */
interface CipherLike
{
    //******************************************************************************
    //* Methods
    //******************************************************************************

    /**
     * Calculates the gematria of $text using the Cipher key
     *
     * @param string   $text
     * @param int|null $reduced
     *
     * @return int
     */
    public function calculate($text, &$reduced = null);

    /**
     * Returns the name of the system
     *
     * @return string
     */
    public function getName();

    /**
     * Returns the cipher key
     *
     * @return array
     */
    public function getKey();
}