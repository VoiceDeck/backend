import express from 'express';
import User from '../models/users.mjs'
export const signup = async(req, res) => {
    const { web3authId, username, firstname, lastname } = req.body
    const user = await User.create({ web3authId, username, firstname, lastname })
    res.json(user)
}

export const login = async(req, res) => {
    const { web3authId } = req.body
    const user = await User.findOne({ web3authId })
    res.json(user)
}