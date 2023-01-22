package com.stockapp.spring.datajpa.service;

import java.util.Calendar;

import javax.sql.DataSource;

import com.stockapp.spring.datajpa.model.Users;
import com.stockapp.spring.datajpa.repository.UsersRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService {
// implements UserDetailsService {

    // @Autowired
    // private UsersRepository userRepository;

    // // @Autowired
    // // private BCryptPasswordEncoder passwordEncoder;

    // public MyUserDetailsService(DataSource dataSource) {
    //     // this.dataSource = dataSource;
    // }

    // @Override
    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //     Users user = userRepository.findByName(username);
    //     if (null == user) {
    //         throw new UsernameNotFoundException("User not found: " + username);
    //     } else {
    //         return  User.withUsername(user.getName())
    //         .password(user.getPassword())
    //         .roles(user.getRole())
    //         .build();
    //     }
    // }

	// public UserDto createUser(UserDto userDto) {
	// 	Users tUser = userRepository.findByName(userDto.getEmail());
	// 	if (tUser != null)
	// 		// throw new UserExistsException("User name already exists!!");

	// 	// tUser = userDao.findByEmail(userDto.getEmail());
	// 	// if (tUser != null)
	// 	// 	throw new UserExistsException("Email Already Exists!!");

	// 	tUser = new Users(null, null, null);
    //     BeanUtils.copyProperties(userDto, tUser);
	// 	// tUser.setPassword(passwordEncoder.encode(userDto.getPassword()));

	// 	tUser.setCreatedDate(Calendar.getInstance().getTime());
	// 	tUser.setModifiedDate(Calendar.getInstance().getTime());
	// 	// tUser.setStatus('A');

	// 	// List<RoleType> roleTypes = new ArrayList<>();
	// 	// userDto.getRole().stream().map(role -> roleTypes.add(RoleType.valueOf(role)));
	// 	tUser.setRole(userDto.getRole());
	// 	Users save = userRepository.save(tUser);
	// 	userDto.setId(save.getId());
	// 	return userDto;
	// }
}
