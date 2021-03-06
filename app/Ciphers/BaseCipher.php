<?php namespace ChaoticWave\WrongNumber\Ciphers;

use ChaoticWave\WrongNumber\Contracts\CipherLike;

abstract class BaseCipher implements CipherLike
{
    //******************************************************************************
    //* Constants
    //******************************************************************************

    /**
     * @var string The name of the gematria system
     */
    const SYSTEM = false;

    //******************************************************************************
    //* Members
    //******************************************************************************

    /**
     * @var string
     */
    protected $name;
    /**
     * @var array
     */
    protected $key;
    /**
     * @var int
     */
    protected $optional;

    //******************************************************************************
    //* Methods
    //******************************************************************************

    /**
     * @param string|null $name
     * @param array|null  $key
     */
    public function __construct($name = null, $key = null)
    {
        if (false !== static::SYSTEM && empty($name) && empty($key)) {
            $name = static::SYSTEM;
        }

        //  Load the cipher
        $this->load($name, $key);
    }

    /**
     * @param string   $text
     * @param int|null $reduced The reduced value will be placed here
     *
     * @return int
     */
    public function calculate($text, &$reduced = null)
    {
        if (empty($this->name) || empty($this->key)) {
            throw new \RuntimeException('No cipher key available.');
        }

        $this->optional = $_value = 0;

        for ($_i = 0, $_max = mb_strlen($text); $_i < $_max; $_i++) {
            $_char = mb_strtoupper($text[$_i]);

            if (array_key_exists($_char, $this->key)) {
                $_value += $this->getCharacterValue(mb_strtoupper($_char), $_i);
            } elseif (is_numeric($_char)) {
                $_value += (int)$_char;
            }
        }

        $reduced = $this->reduceValue($_value);

        return $_value;
    }

    /** @noinspection PhpUnusedParameterInspection
     * Overridable method to interact with the calculation
     *
     * @param string $character
     * @param int    $position
     *
     * @return int
     */
    protected function getCharacterValue($character, $position = 0)
    {
        return isset($this->key[$character]) ? $this->key[$character] : 0;
    }

    /**
     * Returns the Cipher from the config if one isn't given
     *
     * @param string     $name
     * @param array|null $key
     *
     * @return bool
     */
    protected function load($name, $key = null)
    {
        if (empty($name)) {
            return false;
        }

        if (empty($key) && null === ($key = config('ciphers.systems.' . $name))) {
            return false;
        }

        if (null !== ($_defaults = config('ciphers.defaults')) && is_array($_defaults)) {
            $key = array_merge($_defaults, $key);
        }

        $this->key = $key;
        $this->name = $name;

        return true;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string|bool
     */
    public function getSystem()
    {
        return static::SYSTEM;
    }

    /** @inheritdoc */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * Given an integer, the value is reduced to it's lowest value.
     *
     * @param int $value
     *
     * @return int
     */
    protected function reduceValue($value)
    {
        $_valueString = (string)$value;
        $_reduction = 0;

        for ($_i = 0, $_max = strlen($_valueString); $_i < $_max; $_i++) {
            $_reduction += (int)$_valueString[$_i];;
        }

        while ($_reduction > 9 && $_reduction != 11) {
            $_reduction = $this->reduceValue($_reduction);
        }

        return $_reduction;
    }
}
